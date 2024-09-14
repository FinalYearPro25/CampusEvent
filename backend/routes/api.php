<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\GroupController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\UserEventController;
use App\Models\UserEvent;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1' ,'middleware' => ['auth:sanctum']], function () {
    Route::apiResource('groups', GroupController::class);
    Route::get('groups/getusergroup/{user_id}', [GroupController::class, 'getUserGroups']);
    Route::apiResource('events', EventController::class);
    Route::apiResource('userevents', UserEvent::class);
    Route::get('events/getuserevents/{user_id}', [UserEventController::class, 'getUserEvents']);
    Route::get('events/geteventsusers/{user_id}/', [UserEventController::class, 'getEventUsers']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/isLoggedIn', [AuthController::class, 'isLoggedIn']);

});



