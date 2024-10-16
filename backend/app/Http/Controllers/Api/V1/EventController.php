<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Event;
use App\Http\Requests\V1\StoreEventRequest;
use App\Http\Requests\V1\UpdateEventRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\v1\EventCollection;
use App\Http\Resources\v1\EventResource;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\V1\MembersController;

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
        // $userEventController = new UserEventController();
        // Mail::to($request->members_id)->send(new EventCancle($member->name, $event->location, $event->title, $event->start_date, $event->end_date, $event->description,auth('sanctum')->user()->name,$userEventController->generateUniqueString($member->id,$member->created_at),$member->id));
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

    public function countEvents(){
        $events = Event::where('created_by','=',auth('sanctum')->user()->id)->count();
        return $events;
    }

    public function getCalnderEvent($id,$code){
        if($this->checkMemberCode($id,$code) == false){
            return json_encode(["message"=>"invalid"]);
        }
        $events = DB::table('events')
        ->leftJoin('members_event', 'members_event.event_id', '=', 'events.id')
        ->where('members_event.members_id','=',$id)
        ->get();
        foreach($events as $event){
            $members = DB::table('members_event')->where('event_id','=',$event->event_id)->get();
            $event->start = $event->start_date;
            $event->end = $event->end_date;
            $event->title = $event->title;
            $event->participants = count($members);
        }
        return $events;
    }

    public function checkMemberCode($id,$code){
        $member = DB::table('members')->where('id','=',$id)->first();
        if($member == NULL)
            return false;
        $memberController = new MembersController();
        $new_code = $memberController->generateUniqueString($id,$member->created_at);

        if ($code == $new_code)
            return true;
        else
            return false;
    }

}
