<?php

use App\Http\Controllers\ProxyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/original', function () {
    return view('portfolio');
});

if (config('proxy.enable_second_route', true)) {
    Route::any('/second/{any?}', [ProxyController::class, 'portfolio2'])->where('any', '.*');
    Route::any('/_next/{any?}', [ProxyController::class, 'portfolio2Root'])->where('any', '.*');
}

Route::any('/{any?}', [ProxyController::class, 'fixme'])->where('any', '.*');
