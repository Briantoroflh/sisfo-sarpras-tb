<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BorrowedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('details_borrows')->insert([
            [
                'id_items' => 1, // pastikan id ini sudah ada di tabel items
                'amount' => 3,
                'used_for' => 'Praktek Elektronika',
                'class' => 'XII RPL 1',
                'date_borrowed' => Carbon::parse('2025-05-15'),
                'due_date' => Carbon::parse('2025-05-20'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('borroweds')->insert([
            [
                'id_user' => 2, // pastikan user dengan id ini ada
                'id_details_borrow' => 1, // pastikan sesuai dengan detail borrow yang dimasukkan sebelumnya
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
