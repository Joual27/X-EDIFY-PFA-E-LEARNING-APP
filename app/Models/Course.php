<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title','description','max_duration','publisher_id','category_id','image'];
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function instructor(){
        return $this->belongsTo(Instructor::class,'publisher_id');
    }
    public function chapters(){
        return $this->hasMany(Chapter::class);
    }

}
