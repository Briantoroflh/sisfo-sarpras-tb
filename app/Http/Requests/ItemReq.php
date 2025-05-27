<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemReq extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'item_name' => 'required|string|max:255',
            'item_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'code_items' => 'required|string|max:255',
            'id_category' => 'required|exists:category_items,id_category',
            'stock' => 'required|integer|min:0',
            'brand' => 'required|string|max:255',
        ];
    }
}
