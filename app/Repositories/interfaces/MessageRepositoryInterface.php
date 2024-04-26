<?php

namespace App\Repositories\interfaces;

interface MessageRepositoryInterface{
     public function getMessages($room_id);
     public function addMessage($data);
}
