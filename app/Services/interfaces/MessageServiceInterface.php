<?php


namespace App\Services\interfaces;

interface MessageServiceInterface{

    public function fetchMessages($room_id);
    public function createMessage($data);
}
