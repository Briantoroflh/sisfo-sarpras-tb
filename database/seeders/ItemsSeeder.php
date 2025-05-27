<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('items')->insert([
            'item_name' => 'test',
            'item_image' => 'test.jpg',
            'code_items' => 'test1212',
            'id_category' => 3,
            'stock' => 1,
            'brand' => 'test',
        ]);
    }
}
