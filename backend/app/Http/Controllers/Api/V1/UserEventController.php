<?php

namespace App\Http\Controllers\API\V1;

use App\Models\UserEvent;
use App\Http\Requests\V1\StoreUserEventRequest;
use App\Http\Requests\V1\UpdateUserEventRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\GroupController;
use App\Http\Controllers\API\V1\MembersController;

class UserEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserEventRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserEvent $userEvent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserEvent $userEvent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserEventRequest $request, UserEvent $userEvent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserEvent $userEvent)
    {
        //
    }

    public function getUserEvents($user_id)
    {
        // return UserEvent::where('user_id', $user_id)->get();
        $users = DB::table('members_event')
            ->leftJoin('events', 'events.id', '=', 'members_event.event_id')
            ->where('members_event.user_id', $user_id)
            ->select('events.*')
            ->get();

        return response()->json($users);
    }

    public function getEventUsers($event_id)
    {
        $users = DB::table('user_events')
            ->leftJoin('users', 'users.id', '=', 'user_events.user_id')
            ->where('user_events.event_id', $event_id)
            ->select('users.*')
            ->get();

        return response()->json($users);
    }

    public function getStatstics(){
        $member = new MembersController();
        $group = new GroupController();
        $event = new EventController();
        $data = ["members" => $member->countMembers(), "groups" => $group->countGroups(), "events" => $event->countEvents()];
        return json_encode($data);

    }
}
