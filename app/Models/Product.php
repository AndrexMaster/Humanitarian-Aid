<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'image_src',
        'category_id',
        'user_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class); // Устанавливаем отношение "принадлежит к"
    }

    public function user()
    {
        return $this->belongsTo(User::class); // Устанавливаем отношение "принадлежит к"
    }
}
