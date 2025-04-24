<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailReturns extends Model
{
    protected $table = 'detail_returns';
    protected $fillable = [
        'id_detail_return',
        'id_borrowed',
        'id_items'
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
