<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Technique;

class StoreTechniqueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Technique::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'technique_name' => ['required', 'string', 'max:255'],
            'technique_description' => ['nullable', 'string'],
            'category_id' => ['required', 'integer', 'exists:categories,category_id'],
            'position_id' => ['required', 'integer', 'exists:positions,position_id'],
            'class_id' => ['nullable', 'integer', 'exists:training_classes,class_id'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'technique_name.required' => 'Please provide a technique name.',
            'category_id.required' => 'Category ID is required.',
            'position_id.required' => 'Position ID is required.',
        ];
    }
}
