<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class WallController extends Controller
{
    public function index($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->title = $request->title;
        $user->contact = $request->contact;
        $user->image = $request->image;
        $user->update();
        return $user;
    }
}
