<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    $indexPath = public_path('dist/index.html');

    abort_unless(file_exists($indexPath), 503, 'Frontend build not found. Run `npm run build`.');

    return response()->file($indexPath);
})->where('any', '.*');
