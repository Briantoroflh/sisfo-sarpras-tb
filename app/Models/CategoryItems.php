<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryItems extends Model
{
    protected $table = 'category_items';
    protected $fillable = [
        'id_category',
        'category_name',
        'description'
    ];

    public function items()
    {
        return $this->hasMany(Items::class, 'id_category');
    }
}
