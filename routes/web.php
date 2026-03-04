<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/original', function () {
    return view('portfolio');
});

Route::any('/{any?}', function (Request $request) {
    $upstreamBase = env('NEXTJS_HOST', 'http://127.0.0.1:5174');

    $upstreamUrl = rtrim($upstreamBase, '/') . '/' . ltrim($request->path(), '/');

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

    return response()->stream(function () use ($response) {
        echo $response->body();
    }, $response->status(), $headers);
})->where('any', '.*');
