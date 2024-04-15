<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_Chapter extends Model
{
    use HasFactory;
    protected $table = 'temp_chapters';
    protected $fillable = ['title','course_id'];

    public function course(){
        return $this->belongsTo(Course::class,'course_id');
    }
    public function topics(){
        return $this->hasMany(Temp_Topic::class,'chapter_id');
    }
}
