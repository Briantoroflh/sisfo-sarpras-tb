<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReturnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('detail_returns')->insert([
            'id_borrowed' => 1,
            'return_image' => 'return.jpg',
            'description' => 'aman cuii',
            'date_return' => Carbon::now()
        ]);
    }
}
