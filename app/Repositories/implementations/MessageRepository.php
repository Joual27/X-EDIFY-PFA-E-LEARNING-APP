<?php

namespace App\Repositories\implementations;

use App\Models\Message;
use App\Repositories\interfaces\MessageRepositoryInterface;

class MessageRepository implements MessageRepositoryInterface{
    public function getMessages($room_id){
        try{
            return Message::where('discussion_room_id',$room_id)->with('sender')->get();
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }
    public function addMessage($data){
       try{
           return Message::create([
              'sender_id' => $data['sender_id'],
              'content' => $data['content'],
              'discussion_room_id' => $data['discussion_room_id']
           ]);
       }
       catch(\Exception $e){
           return $e->getMessage();
       }
    }
}
