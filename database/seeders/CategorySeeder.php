<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Одяг/екіпіровка',
            'slug' => 'clothes'
        ]);

        Category::create([
            'name' => 'Їжа та продукти',
            'slug' => 'food'
        ]);

        Category::create([
            'name' => 'Ліки та медичні засоби',
            'slug' => 'medicines'
        ]);

        Category::create([
            'name' => 'Товари для гігієни',
            'slug' => 'hygiene'
        ]);

        Category::create([
            'name' => 'Постільне білизна та ковдри',
            'slug' => 'bedding'
        ]);

        Category::create([
            'name' => 'Транспорт',
            'slug' => 'transport'
        ]);
    }
}
