<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Event;
use App\Http\Requests\V1\StoreEventRequest;
use App\Http\Requests\V1\UpdateEventRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\v1\EventCollection;
use App\Http\Resources\v1\EventResource;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new EventCollection(Event::paginate());
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
    public function store(StoreEventRequest $request)
    {
        return new EventResource(Event::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return $event;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
    }

    public function getGroupsEvents($group_id)
    {
        $users = DB::table('events')
            ->where('group_id', $group_id)
            ->select('*')
            ->get();

        foreach ($users as $user) {
            $members = DB::table('members')
                ->Join('members_event', 'members_event.members_id', '=', 'members.id')
                ->where('members_event.event_id', $user->id)
                ->select('members.*')
                ->get();
            $user->members = $members;
        }

        return $users;
    }

    // public function getAllUserEvents($user_id){
    //     $events = DB::table('events')
    //     ->leftJoin()
    // }
}
