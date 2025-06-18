<?php

namespace App\Observers;

use App\Models\DetailsBorrow;

class DetailBorrowObserver
{
    /**
     * Handle the DetailsBorrow "created" event.
     */
    public function created(DetailsBorrow $detailsBorrow): void
    {
        $item = $detailsBorrow->item;
        $stock = $item->stock;
        $amount = $detailsBorrow->amount;

        $resultDecrement = $stock - $amount;
        if($resultDecrement === 0){
            $item->status = 'used';
            $item->stock = $resultDecrement;
        }else{
            $item->stock = $resultDecrement;
        }
        $item->save();
    }

    /**
     * Handle the DetailsBorrow "updated" event.
     */
    public function updated(DetailsBorrow $detailsBorrow): void
    {
        //
    }

    /**
     * Handle the DetailsBorrow "deleted" event.
     */
    public function deleted(DetailsBorrow $detailsBorrow): void
    {
        //
    }

    /**
     * Handle the DetailsBorrow "restored" event.
     */
    public function restored(DetailsBorrow $detailsBorrow): void
    {
        //
    }

    /**
     * Handle the DetailsBorrow "force deleted" event.
     */
    public function forceDeleted(DetailsBorrow $detailsBorrow): void
    {
        //
    }
}
