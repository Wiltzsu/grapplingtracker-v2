<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainingClassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $trainingClass = $this->route('trainingclass');
        return $this->user()->can('update', $trainingClass);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'instructor' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'class_date' => ['required', 'date'],
            'class_description' => ['nullable', 'string'],
            'class_duration' => ['required', 'integer', 'min:1'],
            'rounds' => ['nullable', 'integer', 'min:1'],
            'round_duration' => ['nullable', 'integer', 'min:1'],
            'techniques' => ['sometimes', 'array'],
            'techniques.*.technique_name' => ['required_with:techniques', 'string', 'max:255'],
            'techniques.*.technique_description' => ['required_with:techniques', 'string'],
            'techniques.*.category_id' => ['required_with:techniques', 'integer', 'exists:categories,category_id'],
            'techniques.*.position_id' => ['required_with:techniques', 'integer', 'exists:positions,position_id'],
        ];
    }
}
