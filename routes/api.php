<?php

use App\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['json.response']], function () {


    Route::post('/login', 'Api\AuthController@login');
    
    // private routes
    Route::middleware('auth:api')->group(function () {
        Route::get('/logout', 'Api\AuthController@logout');
        Route::post('/register', 'Api\AuthController@register');
        Route::get('/users', function(){
            if(Auth::user()->role === "admin"){
                $users = User::where('role', '')->get();
                return $users;
            }
        });
        Route::delete('/users/{id}', 'Api\AuthController@destroy');
    });

});