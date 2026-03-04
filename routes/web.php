<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/original', function () {
    return view('portfolio');
});

Route::any('/{any}', function (Request $request) {
    // Get frontend host from environment
    $nextJsHost = env('NEXTJS_HOST', 'http://127.0.0.1:3000');

    // Build the upstream URL
    $upstreamUrl = $nextJsHost . '/' . $request->path();

    // Forward the request
    $response = Http::withHeaders([
        'Accept' => $request->header('Accept', '*/*'),
        'Content-Type' => $request->header('Content-Type', ''),
        'User-Agent' => $request->userAgent() ?? 'Laravel Proxy',
    ])->withOptions([
        'http_errors' => false,
    ])->send($request->method(), $upstreamUrl, [
        'body' => $request->getContent(),
    ]);

    // Return the response from Next.js
    return response($response->body(), $response->status())
        ->withHeaders($response->headers());
})->where('any', '.*');
