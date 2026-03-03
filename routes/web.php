<?php

use Illuminate\Support\Facades\Route;

// Serve portfolio
Route::get('/', function () {
    return view('portfolio');
});

Route::get('/{path}', function () {
    return view('portfolio');
})->where('path', '.*');
