<?php

namespace App\Services\implementations;

use App\Repositories\interfaces\MessageRepositoryInterface;
use App\Services\interfaces\MessageServiceInterface;

class MessageService implements MessageServiceInterface{

    protected MessageRepositoryInterface $messageRepository;

    public function __construct(MessageRepositoryInterface $messageRepository){
        $this->messageRepository = $messageRepository;
    }
    public function fetchMessages($room_id){
        return $this->messageRepository->getMessages($room_id);
    }
    public function createMessage($data){
        return $this->messageRepository->addMessage($data);
    }
}
