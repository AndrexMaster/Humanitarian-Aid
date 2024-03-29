<?php

namespace App\Http\Controllers\Api\Products;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use function PHPUnit\Framework\isEmpty;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        Product::with('category')->get();
        return response()->json(['message' => 'allProducts']);
    }

    public function categoryProducts(Request $request)
    {
        return response()->json(['message' => 'categoryProducts']);
    }

    public function product(Request $request, $productId)
    {
        try {
            $product = Product::where('id', $productId)->with('category')->first();
            return response()->json(['product' => $product]);
        } catch (QueryException $exception) {
            return response()->json(['message' => 'error']);
        }
    }

    public function addProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'fullDescription' => 'nullable|string|max:1000',
            'mediaFile' => 'required|file',
            'categoryId' => 'required|int',
        ]);

        $directory = 'uploads';

        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }
        $mediaFile = $request->file('mediaFile');
        $filePath = $mediaFile->store($directory);

        $newProduct = Product::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'description' => $request->description,
            'full_description' => $request->fullDescription,
            'price' => 0,
            'image_src' => Storage::url($filePath),
            'category_id' =>  $request->categoryId,
            'user_id' => Auth::id(),
        ]);

        $product = Product::with('category')->find($newProduct->id);

        return response()->json(['product' => $product]);
    }
}
