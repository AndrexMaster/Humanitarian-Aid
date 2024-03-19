<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductsController extends Controller
{
    public function index(Request $request)
    {

        return response()->json(['message' => 'allProducts']);
    }

    public function categoryProducts(Request $request)
    {
        return response()->json(['message' => 'categoryProducts']);
    }

    public function product(Request $request)
    {
        return response()->json(['message' => 'product']);
    }

    public function addProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'mediaFile' => 'required|file',
//            'categoryId' => 'required|number',
        ]);

        $directory = 'uploads';

        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }
        $mediaFile = $request->file('mediaFile');
        $filePath = $mediaFile->store($directory);

        $product = Product::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'description' => $request->description,
            'price' => 0,
            'image_src' => Storage::url($filePath),
            'category_id' => 1,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['product' => $product]);
    }
}