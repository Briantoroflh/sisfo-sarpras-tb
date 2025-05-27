<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemRes extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_items,
            'item_name' => $this->item_name,
            'item_image' => $this->item_image,
            'code_item' => $this->code_items,
            'category' => $this->category->category_name,
            'stock' => $this->stock,
            'brand' => $this->brand,
            'status' => $this->status,
            'item_condition' => $this->item_condition,
        ];
    }
}
