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

    public function categoriesWithProducts()
    {
        $categoriesWithProducts = Category::with('products')->get();

        $filteredCategories = $categoriesWithProducts->filter(function ($category) {
            return $category->products->isNotEmpty();
        });

        $categoriesArray = [];

        foreach ($filteredCategories as $category) {
            $categoryProducts = [];

            foreach ($category->products as $product) {
                $categoryProducts[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'imageSrc' => $product->image_src,
                    'category' => [
                        'name' => $category->name,
                        'slug' => $category->slug,
                    ],
                ];
            }

            $categoriesArray[] = [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'products' => $categoryProducts, // Обновленный массив продуктов с добавленным именем категории
            ];
        }
        return response()->json(['categories' => $categoriesArray]);
    }

    public function categoryProducts(Request $request, $categorySlug): JsonResponse
    {
        $category = Category::where('slug', $categorySlug)->first();
        return response()->json(['products' => $category->products]);
    }
}
