<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BorrowedController;
use App\Http\Controllers\CategoryItemsController;
use App\Http\Controllers\DahsboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\UserController;
use App\Models\CategoryItems;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthController::class, 'index']);

Route::get('/dashboard', [DahsboardController::class, 'index']);
Route::get('/user', [UserController::class, 'UserPage']);
Route::get('/items', [ItemController::class, 'ItemsPage']);
Route::get('/category-items', [CategoryItemsController::class, 'CategoryPage']);
Route::get('/borrowed-items', [BorrowedController::class, 'BorrowedPage']);
Route::get('/return-items', [ReturnController::class, 'ReturnPage']);
