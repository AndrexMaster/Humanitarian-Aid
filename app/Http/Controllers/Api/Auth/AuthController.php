<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * Class AuthController
 * @package App\Http\Controllers\Api\Auth
 * This class is responsible for handling authentication related requests.
 */
class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * This method validates the request data and creates a new user.
     * If the user is created successfully, it returns a success message.
     * If the email already exists, it returns an error message.
     * If there is any other error, it returns a failure message.
     */
    public function register(Request $request): JsonResponse
    {
        // Валидация данных пользователя
        $request->validate([
            'name' => 'required|string|max:255',
            'second_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'company_name' => 'nullable|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'second_name' => $request->second_name,
                'surname' => $request->surname,
                'email' => $request->email,
                'company_name' => $request->company_name ?? ' ',
                'password' => Hash::make($request->password),
            ]);

            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (QueryException $exception) {

            if ($exception->errorInfo[1] === 1062) {
                return response()->json(['error' => 'Email already exists'], 409);
            }

            return response()->json(['error' => 'Registration failed', $exception], 500);
        }
    }

    /**
     * Log in a user.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * This method attempts to authenticate the user with the provided credentials.
     * If the authentication is successful, it generates a token and returns it along with the user ID.
     * If the authentication fails, it returns an error message.
     */
    public function login(Request $request): JsonResponse
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

    /**
     * Log out a user.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * This method deletes the current access token of the authenticated user.
     * It then returns a success message.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out'], 200);
    }
}
