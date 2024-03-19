<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Валидация данных пользователя
        $request->validate([
            'name' => 'required|string|max:255',
            'second_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'company_name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        try {
            // Создание нового пользователя
            $user = User::create([
                'name' => $request->name,
                'second_name' => $request->second_name,
                'surname' => $request->surname,
                'email' => $request->email,
                'company_name' => $request->company_name,
                'password' => Hash::make($request->password),
            ]);

            // Отправка ответа
            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (QueryException $exception) {
            // Если произошла ошибка уникальности email
            if ($exception->errorInfo[1] === 1062) {
                return response()->json(['error' => 'Email already exists'], 409);
            }
            // Если другая ошибка
            return response()->json(['error' => 'Registration failed', $exception], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $token = Auth::user()->createToken('authToken')->plainTextToken;
            $userId = Auth::id();

            return response()->json(['token' => $token, 'userId' => $userId], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
