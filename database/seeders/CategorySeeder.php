<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('category_items')->insert([
            ['category_name' => 'Komputer'],
            ['category_name' => 'Laptop'],
            ['category_name' => 'Printer'],
        ]);
    }
}
