<?php

namespace App\Http\Controllers\Api\Global;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['message' => 'Hello, world!']);
    }

    public function headerMenu(): JsonResponse
    {
        $categories = Category::all();

        $categoriesAsMenu = [];
        $categoriesAsMenu[] = [
            'id' => 0,
            'title' => 'Головна',
            'url' => '/',
        ];

        foreach ($categories as $category) {
            $categoriesAsMenu[] = [
                'id' => $category->id,
                'title' => $category->name,
                'url' => '/products/' . $category->slug,
            ];
        }
        return response()->json(['menu' => $categoriesAsMenu]);
    }
}
