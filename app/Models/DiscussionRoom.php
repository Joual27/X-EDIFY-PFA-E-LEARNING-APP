<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscussionRoom extends Model
{
    use HasFactory;

    protected $table = "discussion_rooms";
    protected $fillable = ['course_id'];

    public function messages(){
        return $this->hasMany(Message::class,'discussion_room_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
