<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowedRes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_borrowed,
            'users' => new UserResource($this->user),
            'detailBorrow' => new DetailBorrowRes($this->detailsBorrow),
            'borrowed_date' => $this->detailsBorrow->date_borrowed,
            'due_date' => $this->detailsBorrow->due_date,
            'status' => $this->status
        ];
    }
}
