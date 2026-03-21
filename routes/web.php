<?php

use Illuminate\Support\Facades\Route;

// Serves the Vite/React SPA from public/dist (see src/pages/Home.tsx). Blade views like
// resources/views/portfolio.blade.php are not used unless you change this route.
Route::get('/{any?}', function () {
    $indexPath = public_path('dist/index.html');

    abort_unless(file_exists($indexPath), 503, 'Frontend build not found. Run `npm run build`.');

    return response()->file($indexPath);
})->where('any', '.*');
