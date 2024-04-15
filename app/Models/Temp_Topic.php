<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_Topic extends Model
{
    use HasFactory;
    protected $fillable = ['title','chapter_id'];
    protected $table = 'temp_topics';
    public function chapter(){
        return $this->belongsTo(Temp_Chapter::class,'chapter_id');
    }

    public function content(){
        return $this->hasOne(Temp_Content::class,'topic_id');
    }
}
