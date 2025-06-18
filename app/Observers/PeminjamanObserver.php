<?php

namespace App\Observers;

use App\Models\Borrowed;
use App\Models\Items;
use App\Models\LogActivity;

class PeminjamanObserver
{
    /**
     * Handle the Borrowed "created" event.
     */
    public function created(Borrowed $borrowed): void
    {
        $user = $borrowed->user;

        LogActivity::create([
            'id_user' => $user->id_user,
            'description' => 'User telah melakukan peminjaman'
        ]);
    }

    /**
     * Handle the Borrowed "updated" event.
     */
    public function updated(Borrowed $borrowed): void
    {
        
    }

    /**
     * Handle the Borrowed "deleted" event.
     */
    public function deleted(Borrowed $borrowed): void
    {
        //
    }

    /**
     * Handle the Borrowed "restored" event.
     */
    public function restored(Borrowed $borrowed): void
    {
        //
    }

    /**
     * Handle the Borrowed "force deleted" event.
     */
    public function forceDeleted(Borrowed $borrowed): void
    {
        //
    }
}
