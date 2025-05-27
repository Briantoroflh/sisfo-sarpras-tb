<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogActivity extends Model
{
    protected $table = 'log_activity';
    protected $primaryKey = 'id_log';
    protected $fillable = [
        'id_user',
        'description'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }
}
