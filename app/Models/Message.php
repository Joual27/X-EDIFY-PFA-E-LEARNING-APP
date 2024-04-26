<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['sender_id', 'discussion_room_id', 'content'];
    public function sender(){
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function discussion_room(){
        return $this->belongsTo(DiscussionRoom::class, 'discussion_room_id');
    }


}
