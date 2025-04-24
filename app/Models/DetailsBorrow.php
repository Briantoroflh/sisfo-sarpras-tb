<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailsBorrow extends Model
{
    protected $table = 'details_borrows';
    protected $fillable = [
        'id_details_borrow',
        'id_items',
        'id_borrowed',
        'amount'
    ];

    public function item()
    {
        return $this->belongsTo(Items::class, 'id_items');
    }

    public function borrowed()
    {
        return $this->belongsTo(Borrowed::class, 'id_borrowed');
    }
}
