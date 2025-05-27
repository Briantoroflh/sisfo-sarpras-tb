<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DetailBorrowReq extends FormRequest
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
            'id_items' => 'required|integer|exists:items,id_item',
            'amount' => 'required|integer|min:1',
            'used_for' => 'required|string|max:255',
            'class' => 'required|string|max:255',
            'date_borrowed' => ['required', Rule::date()->format('Y-m-d')],
            'due_date' => ['required', Rule::date()->format('Y-m-d')],
        ];
    }
}
