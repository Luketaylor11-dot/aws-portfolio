<?php

use App\Http\Controllers\KnowledgeBaseChatController;
use Illuminate\Support\Facades\Route;

Route::post('/knowledge/chat', KnowledgeBaseChatController::class);
