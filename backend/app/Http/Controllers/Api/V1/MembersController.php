<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Members;
use App\Http\Requests\V1\StoreMembersRequest;
use App\Http\Requests\V1\UpdateMembersRequest;
use App\Http\Resources\v1\MembersCollection;
use App\Http\Controllers\Controller;
use App\Http\Resources\v1\MembersResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new MembersCollection(Members::paginate());
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
    public function store(StoreMembersRequest $request, Members $members)
    {
        $members = Members::where('user_id', $request->user_id)->where('email', $request->email)->first();

        if ($members != NULL) {
            return json_encode(["message" => "Members already in the list."]);
        }
        return new MembersResource(Members::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Members $members)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Members $members)
    {
        return $members;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMembersRequest $request, Members $members)
    {
        $members->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Members::find($id)->delete();
        // var_dump($members);
        // $members->delete();
        return true;
    }

    public function getMembersByUser($user_id, Members $members)
    {
        $members = Members::where('user_id', $user_id)->get();
        return new MembersCollection($members);
    }

    public function getMemberIdByEmail($email)
    {
        $members = Members::where('email', $email)->first();
        // echo $members;
        return $members->id;
    }

    public function addEventMembersByGroup(Request $request)
    {
        // return $request;
        $events = Event::where("group_id", $request->group_id)->get();
        $data = array();
        foreach ($request->members_id as $member) {
            $member_id = $this->getMemberIdByEmail($member);
            foreach ($events as $event) {
                $exist = DB::table('members_event')->where('event_id', '=', $event->id)->where('members_id', '=',  $member_id)->first();
                if ($exist != NULL)
                    return json_encode(["message" => "exist"]);
                $data[] = array('event_id' => $event->id, 'members_id' => $member_id);
            }
        }
        DB::table('members_event')->insert($data);
    }

    public function getMembersByEvent($event_id)
    {
        $members = DB::table('members')
            ->leftJoin('members_event', 'members.id', 'members_event.members_id')
            ->where('members_event.event_id', '=', $event_id)
            ->get();
        return $members;
    }

    public function deleteEventMembers($id)
    {
        DB::table('members_event')->delete($id);
    }

    public function addEventMembers(Request $request)
    {
        // var_dump($request);
        foreach ($request->members_id as $member) {
            $member_id = $this->getMemberIdByEmail($member);
            $exist = DB::table('members_event')->where('event_id', '=', $request->event_id)->where('members_id', '=',  $member_id)->first();
            if ($exist != NULL)
                return json_encode(["message" => "exist"]);
            $data[] = array('event_id' => $request->event_id, 'members_id' => $member_id);
        }
        DB::table('members_event')->insert($data);
    }
}
