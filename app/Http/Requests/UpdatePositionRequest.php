<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePositionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $position = $this->route('position');
        return $this->user()->can('update', $position);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'position_name' => ['required', 'string', 'max:255', 'regex:/^[\p{L}\p{N}\s\-_]+$/u'],
            'position_description' => ['nullable', 'string', 'max:255', 'regex:/^[\p{L}\p{N}\s\-_.,!?]+$/u'],
        ];
    }
}
