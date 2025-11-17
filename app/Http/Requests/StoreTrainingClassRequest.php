<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\TrainingClass;

class StoreTrainingClassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', TrainingClass::class);
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
            'instructor' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'class_date' => ['required', 'date'],
            'class_description' => ['nullable', 'string'],
            'class_duration' => ['required', 'integer', 'min:1'],
            'rounds' => ['nullable', 'integer', 'min:1'],
            'round_duration' => [ 'nullable', 'integer', 'min:1'],
            'techniques' => ['sometimes', 'array'],
            'techniques.*.technique_name' => ['required_with:techniques', 'string', 'max:255'],
            'techniques.*.technique_description' => ['required_with:techniques', 'string'],
            'techniques.*.category_id' => ['required_with:techniques', 'integer'],
            'techniques.*.position_id' => ['required_with:techniques', 'integer'],
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
            'class_date.required' => 'Please provide a session date.',
            'class_duration_required' => 'Session duration is required.',
            'class_duration.min' => 'Session duration must be at least 1 minute.',
        ];
    }
}
