<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_Content extends Model
{
    use HasFactory;
    protected $table = 'temp_contents';

    protected $fillable = ['data_type','topic_id'];

    public function topic(){
        return $this->belongsTo(Temp_Topic::class,'topic_id');
    }
}
