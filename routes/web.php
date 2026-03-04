<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/original', function () {
    return view('portfolio');
});

$proxy = function (Request $request, string $baseUrl, string $stripPrefix = '') {
    $rawUri = $request->server('REQUEST_URI', '/');

    if ($stripPrefix !== '' && str_starts_with($rawUri, $stripPrefix)) {
        $rawUri = substr($rawUri, strlen($stripPrefix));
        $rawUri = $rawUri === '' ? '/' : $rawUri;
        if (!str_starts_with($rawUri, '/')) {
            $rawUri = '/' . $rawUri;
        }
    }

    $upstreamUrl = rtrim($baseUrl, '/') . $rawUri;

    $upstreamResponse = Http::withHeaders([
        'Accept' => $request->header('Accept', '*/*'),
        'Content-Type' => $request->header('Content-Type', ''),
        'User-Agent' => $request->userAgent() ?? 'Laravel Proxy',
    ])->withOptions([
        'http_errors' => false,
    ])->send($request->method(), $upstreamUrl, [
        'body' => $request->getContent(),
    ]);

    $headers = collect($upstreamResponse->headers())
        ->except(['transfer-encoding', 'connection', 'keep-alive'])
        ->map(fn ($values) => is_array($values) ? implode(', ', $values) : $values)
        ->toArray();

    return response()->stream(function () use ($upstreamResponse) {
        echo $upstreamResponse->body();
    }, $upstreamResponse->status(), $headers);
};

// Serve second route from portfolio2 Next.js app
Route::any('/second/{path?}', function (Request $request, ?string $path = null) use ($proxy) {
    return $proxy($request, 'http://127.0.0.1:3001', '/second');
})->where('path', '.*');

Route::any('/_next/{path?}', function (Request $request, ?string $path = null) use ($proxy) {
    return $proxy($request, 'http://127.0.0.1:3001');
})->where('path', '.*');

Route::any('/__nextjs/{path?}', function (Request $request, ?string $path = null) use ($proxy) {
    return $proxy($request, 'http://127.0.0.1:3001');
})->where('path', '.*');

// Serve root route from fix me app (React/Vite runtime)
Route::any('/{path?}', function (Request $request, ?string $path = null) use ($proxy) {
    return $proxy($request, 'http://127.0.0.1:5174');
})->where('path', '^(?!original($|/)|second($|/)|_next($|/)|__nextjs($|/)).*');
