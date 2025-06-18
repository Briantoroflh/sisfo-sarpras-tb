<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailBorrowRes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_details_borrow,
            'item' => new ItemRes($this->item),
            'quantity' => $this->amount,
            'noted' => $this->used_for,
            'class' => $this->class,
            'date_borrowed' => $this->date_borrowed,
            'due_date' => $this->due_date,
        ];
    }
}
