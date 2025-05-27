<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BorrowedController;
use App\Http\Controllers\CategoryItemsController;
use App\Http\Controllers\DahsboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReturnController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\CategoryItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'Login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::delete('/logout/{id}', [AuthController::class, 'Logout'])->where('id', '[0-9]+');

    Route::middleware('role:user|admin')->group(function () {
        //profile
        Route::get('/me', [AuthController::class, 'Me']);

        // category users endpoint
        Route::get('/category-items', [CategoryItemsController::class, 'getAllCategory']);
        Route::get('/category-items/{id}', [CategoryItemsController::class, 'getCategoryById']);

        //item users endpoint
        Route::get('/items', [ItemController::class, 'getAllItems']);
        Route::get('/items/{id}', [ItemController::class, 'getItemById']);

        //borrowed users endpoint
        Route::get('/borrowed', [BorrowedController::class, 'index']);
        Route::get('/borrowed/{id}', [BorrowedController::class, 'getBorrowedById']);

        //users endpoint
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, '']);

        //return user endpoint
        Route::get('/return', [ReturnController::class, 'getAllReturn']);
        Route::get('/return/{id}', [ReturnController::class, 'getReturnById']);
    });

    Route::middleware('role:admin')->group(function () {
        //for dashboard
        Route::get('/dashboard-admin', [DahsboardController::class, 'Dashboard']);

        //for admin manage users
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->where('id', '[0-9]+');

        //for admin manage item
        Route::post('/items', [ItemController::class, 'store']);
        Route::put('/items/{id}', [ItemController::class, 'update']);
        Route::delete('/items/{id}', [ItemController::class, 'destroy']);

        //for admin manage categories
        Route::post('/category-items', [CategoryItemsController::class, 'store']);
        Route::put('/category-items/{id}', [CategoryItemsController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/category-items/{id}', [CategoryItemsController::class, 'destroy'])->where('id', '[0-9]+');

        //for admin manage borrowed
        Route::put('/borrowed/{id}/approved', [BorrowedController::class, 'approve'])->where('id', '[0-9]+');
        Route::put('/borrowed/{id}/reject', [BorrowedController::class, 'reject'])->where('id', '[0-9]+');

        //for admin manage return
        Route::put('/return/{id}/approved', [ReturnController::class, 'approve']);
        Route::put('/return/{id}/reject', [ReturnController::class, 'reject']);
    });

});
