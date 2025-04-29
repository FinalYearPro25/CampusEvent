<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'location',
        'group_id',
        'participants_limit',
        'edited_by',
        'created_by',

    ];

    public function user()
    {
        // return $this->belongsToMany(User::class, 'user_events', 'event_id', 'user_id');
        return $this->belongsTo(User::class, 'created_by');
    }

    public function groups()
    {
        return $this->belongsTo(Group::class);
    }

}
