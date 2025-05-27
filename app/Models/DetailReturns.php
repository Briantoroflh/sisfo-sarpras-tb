<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailReturns extends Model
{
    protected $table = 'detail_returns';
    protected $primaryKey = 'id_detail_return';
    protected $fillable = [
        'id_borrowed',
        'status',
        'return_image',
        'soft_delete',
        'description',
        'date_return',
    ];

    public function borrowed()
    {
        return $this->belongsTo(Borrowed::class, 'id_borrowed', 'id_borrowed');
    }
}
