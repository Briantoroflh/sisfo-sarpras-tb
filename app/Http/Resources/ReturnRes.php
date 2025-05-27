<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnRes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_detail_return,
            'image' => $this->return_image,
            'description' => $this->description,
            'user' => $this->borrowed->user->name,
            'item' => $this->borrowed->detailsBorrow->item->item_name,
            'date_returned' => $this->date_return,
            'status' => $this->status,
        ];
    }
}
