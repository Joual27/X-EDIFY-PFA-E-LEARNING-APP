<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_Course extends Model
{
    use HasFactory;
    protected $table = 'temp_courses';
    protected $fillable = ['title','description','max_duration','publisher_id','category_id'];
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function instructor(){
        return $this->belongsTo(Instructor::class,'publisher_id');
    }
    public function chapters(){
        return $this->hasMany(Temp_Chapter::class,'course_id');
    }
}
