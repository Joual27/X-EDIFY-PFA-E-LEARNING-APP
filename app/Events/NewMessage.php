<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public User $user;
    public $message;
    public $discussion_room_id;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user,$message , $discussion_room_id)
    {
        $this->user = $user;
        $this->message = $message;
        $this->discussion_room_id = $discussion_room_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('discussion.room.'.$this->discussion_room_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->user->id,
            'name' => $this->user->name,
            'image' => $this->user->image,
            'content' => $this->message,
            'on' => now()->toDateTimeString()
        ];
    }

    public function broadcastAs()
    {
        return 'chat-message';
    }

}
