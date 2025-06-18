<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DetailReturnReq extends FormRequest
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
            'id_borrowed' => 'required|integer',
            'return_image' => 'nullable|string',
            'description' => 'required|string|max:255',
            'date_return' => ['required', Rule::date()->format('Y-m-d')]
        ];
    }
}
