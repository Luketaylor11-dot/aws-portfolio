<?php

return [
    'fixme_host' => env('FIXME_HOST', 'http://127.0.0.1:5174'),
    'portfolio2_host' => env('PORTFOLIO2_HOST', 'http://127.0.0.1:3001'),
    'enable_second_route' => filter_var(env('ENABLE_SECOND_ROUTE', true), FILTER_VALIDATE_BOOL),
];
