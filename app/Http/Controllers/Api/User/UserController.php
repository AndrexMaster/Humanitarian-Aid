<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request, $userId)
    {
        $user = User::find($userId);
        return response()->json(['user' => [
            'name' => $user->name,
            'second_name' => $user->second_name,
            'surname' => $user->surname,
            'email' => $user->email,
            'companyName' => $user->company_name,
        ]]);
    }

    public function update(Request $request)
    {
        // Валидация входящих данных
        $request->validate([
            'name' => 'string|max:255',
            'second_name' => 'string|max:255',
            'surname' => 'string|max:255',
            'email' => 'required|email|unique:users,email,'.$request->user()->id,
        ]);

        // Получение текущего пользователя
        $user = $request->user();

        // Обновление данных пользователя
        $user->name = $request->input('name');
        $user->second_name = $request->input('second_name');
        $user->surname = $request->input('surname');
        $user->email = $request->input('email');

        // Сохранение изменений
        $user->save();

        // Возврат успешного ответа с сообщением
        return response()->json([
            'message' => 'User information updated successfully',
            'user' => $user,
        ]);
    }

    public function userProducts(Request $request, $userId)
    {
        $products = Product::where('user_id', $userId)->get();

        $productsWithCategories = [];

        foreach ($products as $product) {
            $productsWithCategories[] = [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'image_src' => $product->image_src,
                'category' => [
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ],
            ];
        }
        return response()->json(['products' => $productsWithCategories]);
    }

    public function userNotifications(Request $request)
    {
        return response()->json(['message' => 'userNotifications']);
    }
}
