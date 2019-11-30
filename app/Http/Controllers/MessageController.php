<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\AlertSent;
use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    
    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages()
    {
        return Message::where('user_id', Auth::id())->with('user')->get();
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();
        
        $message = $user->messages()->create([
            'body' => $request->body
        ]);
        
        broadcast(new MessageSent($user, $message));
        
        return ['status' => 'Message Sent!'];
    }
        
    public function sendAlert(Request $request)
    {
        $user = Auth::user();
        $alert = $request->alert;

        broadcast(new AlertSent($user, $alert));

        return ['status' => 'Alert Sent!'];
    }
}
