<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth', function () {
    return view('welcome');
});


Route::prefix('user')->group(function () {
    Route::get('/{userId}', function () {
        return view('welcome');
    });

    Route::get('/{userId}/{tab}', function () {
        return view('welcome');
    });
});

Route::prefix('products')->group(function () {
    Route::get('/{category}', function () {
        return view('welcome');
    });

    Route::get('/{category}/{productId}', function () {
        return view('welcome');
    });
});
