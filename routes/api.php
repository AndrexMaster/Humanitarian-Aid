<?php

use App\Http\Controllers\Api\Categories\CategoriesController;
use App\Http\Controllers\Api\Global\IndexController;
use App\Http\Controllers\Api\Products\ProductsController;
use App\Http\Controllers\Api\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['web']], function () {
    Route::prefix('auth')->group(static function (){
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });
});

Route::middleware('auth:sanctum')->prefix('user')->group(static function (){
    Route::get('/{userId}', [UserController::class, 'index']);
    Route::post('/{userId}', [UserController::class, 'update']);
    Route::get('/{userId}/products', [UserController::class, 'userProducts']);
    Route::get('/{userId}/notifications', [UserController::class, 'userNotifications']);
    Route::post('/{userId}/notifications', [UserController::class, 'userNotifications']);
});

Route::prefix('products')->group(static function (){
    Route::get('/', [ProductsController::class, 'index']);
    Route::get('/{category}', [ProductsController::class, 'categoryProducts']);
    Route::get('/{productId}', [ProductsController::class, 'product']);

    Route::middleware('auth:sanctum')->group(static function (){
        Route::post('/addProduct', [ProductsController::class, 'addProduct']);
    });
});

Route::prefix('categories')->group(static function (){
    Route::get('/', [CategoriesController::class, 'index']);
    Route::get('/withProducts', [CategoriesController::class, 'categoriesWithProducts']);
    Route::get('/{categorySlug}', [CategoriesController::class, 'category']);
    Route::get('/{categorySlug}/products', [CategoriesController::class, 'categoryProducts']);
});

Route::get('/headerMenu', [IndexController::class, 'headerMenu']);


Route::get('/storage/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);
    if (!file_exists($path)) {
        abort(404);
    }
    return response()->file($path);
})->where('filename', '.*');
