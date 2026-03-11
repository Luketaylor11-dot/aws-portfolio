<?php

namespace App\Http\Controllers;

use Aws\BedrockAgentRuntime\BedrockAgentRuntimeClient;
use Aws\Exception\AwsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class KnowledgeBaseChatController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:4000'],
            'sessionId' => ['nullable', 'string', 'min:2', 'max:128'],
        ]);

        $sessionId = isset($validated['sessionId']) ? trim((string) $validated['sessionId']) : null;
        if ($sessionId === '') {
            $sessionId = null;
        }

        $knowledgeBaseId = (string) env('AWS_BEDROCK_KB_ID', '');
        $modelArn = (string) env(
            'AWS_BEDROCK_MODEL_ARN',
            'arn:aws:bedrock:us-east-1::foundation-model/amazon.nova-pro-v1:0'
        );

        if ($knowledgeBaseId === '') {
            return response()->json([
                'message' => 'Missing AWS_BEDROCK_KB_ID configuration.',
            ], 500);
        }

        $client = new BedrockAgentRuntimeClient([
            'version' => 'latest',
            'region' => (string) env('AWS_DEFAULT_REGION', 'us-east-1'),
            'credentials' => [
                'key' => (string) env('AWS_ACCESS_KEY_ID', ''),
                'secret' => (string) env('AWS_SECRET_ACCESS_KEY', ''),
            ],
        ]);

        try {
            $requestPayload = [
                'input' => [
                    'text' => $validated['message'],
                ],
                'retrieveAndGenerateConfiguration' => [
                    'type' => 'KNOWLEDGE_BASE',
                    'knowledgeBaseConfiguration' => [
                        'knowledgeBaseId' => $knowledgeBaseId,
                        'modelArn' => $modelArn,
                        'generationConfiguration' => [
                            'promptTemplate' => [
                                'textPromptTemplate' => "You are Luke. Speak in first person (I/me/my) as if you are Luke talking directly to the user.\n\n### YOUR VIBE:\nBe helpful, professional, and slightly tech-savvy. Keep answers to 2 sentences.\n\n### CONVERSATION RULES:\n- If the user says 'Hi', respond naturally in first person, for example: 'Hi! Great to meet you. What would you like to know about my experience?'\n- When explaining projects, focus on the result I achieved.\n- ONLY give my phone/email if they specifically ask to 'contact', 'call', or 'email' me.\n- End every response with a short question like: 'Want to hear about my AWS work?' or 'Should I tell you about my Laravel projects?'\n- Never describe me in third person (no 'Luke', 'he', 'his' when answering).\n\nContext: \$search_results\$ \nQuery: \$query\$",
                            ],
                        ],
                    ],
                ],
            ];

            if ($sessionId !== null) {
                $requestPayload['sessionId'] = $sessionId;
            }

            $result = $client->retrieveAndGenerate($requestPayload)->toArray();
        } catch (AwsException $exception) {
            report($exception);

            return response()->json([
                'message' => 'AWS Bedrock request failed.',
                'error' => $exception->getAwsErrorMessage() ?: $exception->getMessage(),
            ], 502);
        }

        $answer = Arr::get($result, 'output.text');

        if (! is_string($answer) || trim($answer) === '') {
            return response()->json([
                'message' => 'Bedrock returned an empty response.',
            ], 502);
        }

        if ($this->isContactRequest($validated['message'])) {
            $answer = $this->removeTrailingQuestion($answer);
        }

        return response()->json([
            'answer' => $answer,
            'sessionId' => Arr::get($result, 'sessionId') ?: ($sessionId ?? Str::uuid()->toString()),
            'sources' => $this->extractSources($result),
        ]);
    }

    private function isContactRequest(string $message): bool
    {
        return Str::contains(Str::lower($message), [
            'arrange a call',
            'set up a call',
            'schedule a call',
            'email you',
            'email luke',
            'contact you',
            'contact luke',
            'speak to luke',
            'talk to luke',
            'get in touch',
            'reach you',
            'reach luke',
            'phone number',
            'email address',
        ]);
    }

    private function removeTrailingQuestion(string $answer): string
    {
        $trimmedAnswer = trim($answer);
        $updatedAnswer = preg_replace('/\s*[^?.!]*\?\s*$/u', '', $trimmedAnswer);

        if (! is_string($updatedAnswer) || trim($updatedAnswer) === '') {
            return $trimmedAnswer;
        }

        return trim($updatedAnswer);
    }

    /**
     * @param array<string, mixed> $result
     * @return array<int, string>
     */
    private function extractSources(array $result): array
    {
        $sources = [];

        $citations = Arr::get($result, 'citations', []);

        if (! is_array($citations)) {
            return [];
        }

        foreach ($citations as $citation) {
            if (! is_array($citation)) {
                continue;
            }

            $references = Arr::get($citation, 'retrievedReferences', []);

            if (! is_array($references)) {
                continue;
            }

            foreach ($references as $reference) {
                if (! is_array($reference)) {
                    continue;
                }

                $uri = Arr::get($reference, 'location.s3Location.uri')
                    ?: Arr::get($reference, 'location.webLocation.url')
                    ?: Arr::get($reference, 'location.confluenceLocation.url')
                    ?: Arr::get($reference, 'location.salesforceLocation.url');

                if (is_string($uri) && $uri !== '') {
                    $sources[] = $uri;
                }
            }
        }

        return array_values(array_unique($sources));
    }
}
