<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request) {
        $request['role'] = "";
        $data = $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|',
        ]);
    
        $request['password'] = Hash::make($request['password']);

        $user = User::create($request->toArray());
    
        return response($user, 200);
    
    }

    public function login (Request $request) {


        $user = User::where('email', $request->email)->first();
        if ($user) {
    
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $response = [
                    'token' => $token,
                    'role' => $user->role,
                    'id' => $user->id
                ];
                return response($response, 200);
            } else {
                $response = "Password missmatch";
                return response($response, 422);
            }
    
        } else {
            $response = 'User does not exist';
            return response($response, 422);
        }
    
    }

    public function destroy ($id){
        $user = User::find($id);
        $user->delete();
        return 'Deleted';
    }

    public function logout (Request $request) {

        $token = $request->user()->token();
        $token->revoke();
    
        $response = 'You have been succesfully logged out!';
        return response($response, 200);
    
    }
}
