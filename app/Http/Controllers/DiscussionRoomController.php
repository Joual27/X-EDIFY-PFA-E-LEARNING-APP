<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Models\User;
use App\Services\interfaces\MessageServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Mail\Events\MessageSent;

class DiscussionRoomController extends Controller
{
    protected MessageServiceInterface $messageService;
    public function __construct(MessageServiceInterface $messageService){
        $this->messageService = $messageService;
    }
    public function sendMessage(MessageRequest $request){
       $message_data = $request->validated();
       $res = $this->messageService->createMessage($message_data);
       if($res instanceof Message){
           $user = auth()->user();
           broadcast(new NewMessage($user, $message_data['content'] , $message_data['discussion_room_id']));
           return [
               'case' => 'success',
           ];
       }
       else {
           return [
               'case' => 'error',
               'message' => $res
           ];
       }
    }

    public function getRoomMessages($room_id){
        $res = $this->messageService->fetchMessages($room_id);
        if($res[0] instanceof Message){
            return[
                'case' => 'success',
                'messages' => $res
            ];
        }
        else {
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

}
