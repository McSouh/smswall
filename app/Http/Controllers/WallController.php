<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
        if ($request->image ) {
            if(file_exists(public_path($user->image))){
                unlink(public_path($user->image));
            }
            $validate = $request->validate([
            'image' => 'image'
            ]);
            $file = $request->image;
            $name = time().time().'.'.$file->guessExtension();
            $target_path = public_path('/uploads/');
            $file->move($target_path, $name);
            $user->image = '/uploads/' . $name;
        }
        $user->update();
        return $user;
    }
}
