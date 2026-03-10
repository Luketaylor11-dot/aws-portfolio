<?php

use App\Http\Controllers\ProxyController;
use Illuminate\Support\Facades\Route;

Route::get('/original', function () {
    return view('portfolio');
});

Route::any('/{any?}', [ProxyController::class, 'fixme'])->where('any', '.*');
