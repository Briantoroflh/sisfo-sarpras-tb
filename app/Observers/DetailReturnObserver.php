<?php

namespace App\Observers;

use App\Models\DetailReturns;

class DetailReturnObserver
{
    /**
     * Handle the DetailReturns "created" event.
     */
    public function created(DetailReturns $detailReturns): void
    {
       
    }

    /**
     * Handle the DetailReturns "updated" event.
     */
    public function updated(DetailReturns $detailReturns): void
    {
        $item = $detailReturns->borrowed->detailsBorrow->item;
        $stock = $item->stock;
        if ($detailReturns->status === 'approved') {
            $item->stock = $stock + 1; // <-- ini yang diupdate
            $item->status = ($item->stock <= 0) ? 'used' : 'unused';
        }
        $item->save();
    }

    /**
     * Handle the DetailReturns "deleted" event.
     */
    public function deleted(DetailReturns $detailReturns): void
    {
        //
    }

    /**
     * Handle the DetailReturns "restored" event.
     */
    public function restored(DetailReturns $detailReturns): void
    {
        //
    }

    /**
     * Handle the DetailReturns "force deleted" event.
     */
    public function forceDeleted(DetailReturns $detailReturns): void
    {
        //
    }
}
