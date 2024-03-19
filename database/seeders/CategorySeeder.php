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
        ]);

        Category::create([
            'name' => 'Їжа та продукти',
        ]);

        Category::create([
            'name' => 'Ліки та медичні засоби',
        ]);

        Category::create([
            'name' => 'Товари для гігієни',
        ]);

        Category::create([
            'name' => 'Постільне білизна та ковдри',
        ]);

        Category::create([
            'name' => 'Транспорт',
        ]);
    }
}
