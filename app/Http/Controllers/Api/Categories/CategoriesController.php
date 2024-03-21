<?php

namespace App\Http\Controllers\Api\Categories;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['categories' => Category::all()]);
    }

    public function category(Request $request, $categorySlug): JsonResponse
    {
        $category = Category::where('slug', $categorySlug)->get();
        return response()->json(['category' => $category]);
    }

    public function categoryProducts(Request $request, $categorySlug): JsonResponse
    {
        $category = Category::where('slug', $categorySlug)->first();
        return response()->json(['products' => $category->products]);
    }
}
