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
            'secondName' => $user->second_name,
            'surname' => $user->surname,
            'email' => $user->email,
            'companyName' => $user->company_name,
        ]]);
    }

    public function update(Request $request)
    {
        return response()->json(['message' => 'userUpdate']);
    }

    public function userProducts(Request $request, $userId)
    {
        $products = Product::where('user_id', $userId)->get();
        return response()->json(['products' => $products]);
    }

    public function userNotifications(Request $request)
    {
        return response()->json(['message' => 'userNotifications']);
    }
}
