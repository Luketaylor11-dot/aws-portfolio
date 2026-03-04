<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{
    public function fixme(Request $request)
    {
        return $this->proxy($request, (string) config('proxy.fixme_host'));
    }

    public function portfolio2(Request $request)
    {
        return $this->proxy($request, (string) config('proxy.portfolio2_host'), '/second', true);
    }

    public function portfolio2Root(Request $request)
    {
        return $this->proxy($request, (string) config('proxy.portfolio2_host'));
    }

    private function proxy(Request $request, string $baseUrl, string $stripPrefix = '', bool $rewriteSecondHtml = false)
    {
        $rawUri = $request->server('REQUEST_URI', '/');

        if ($stripPrefix !== '' && str_starts_with($rawUri, $stripPrefix)) {
            $rawUri = substr($rawUri, strlen($stripPrefix));
            $rawUri = $rawUri === '' ? '/' : $rawUri;
            if (!str_starts_with($rawUri, '/')) {
                $rawUri = '/' . $rawUri;
            }
        }

        $upstreamUrl = rtrim($baseUrl, '/') . $rawUri;

        $response = Http::withHeaders([
            'Accept' => $request->header('Accept', '*/*'),
            'Content-Type' => $request->header('Content-Type', ''),
            'User-Agent' => $request->userAgent() ?? 'Laravel Proxy',
        ])->withOptions([
            'http_errors' => false,
        ])->send($request->method(), $upstreamUrl, [
            'body' => $request->getContent(),
        ]);

        $headers = collect($response->headers())
            ->except(['transfer-encoding', 'connection', 'keep-alive'])
            ->map(fn ($values) => is_array($values) ? implode(', ', $values) : $values)
            ->toArray();

        $body = $response->body();
        $contentType = strtolower((string) ($headers['Content-Type'] ?? $headers['content-type'] ?? ''));

        if ($rewriteSecondHtml && str_contains($contentType, 'text/html')) {
            $body = str_replace(
                ['"/_next/', "'/_next/", 'src="/_next/', 'href="/_next/'],
                ['"/second/_next/', "'/second/_next/", 'src="/second/_next/', 'href="/second/_next/'],
                $body
            );
        }

        return response()->stream(function () use ($body) {
            echo $body;
        }, $response->status(), $headers);
    }
}
