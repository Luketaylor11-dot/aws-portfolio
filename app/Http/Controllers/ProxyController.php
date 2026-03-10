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

    private function proxy(Request $request, string $baseUrl)
    {
        $rawUri = $request->server('REQUEST_URI', '/');

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

        return response()->stream(function () use ($body) {
            echo $body;
        }, $response->status(), $headers);
    }
}
