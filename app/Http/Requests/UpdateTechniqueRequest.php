<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTechniqueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $technique = $this->route('technique');
        return $this->user()->can('update', $technique);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'technique_name' => ['required', 'string', 'max:255'],
            'technique_description' => ['nullable', 'string'],
            'category_id' => ['required', 'integer', 'exists:categories,category_id'],
            'position_id' => ['required', 'integer', 'exists:positions,position_id'],
            'class_id' => ['nullable', 'integer', 'exists:training_classes,class_id'],
        ];
    }
}
