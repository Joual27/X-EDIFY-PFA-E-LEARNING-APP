<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CourseRequest extends FormRequest
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
            'title' => 'required|string',
            'description' => 'required|string',
            'duration_type' => 'required|string',
            'max_duration' => 'required|integer',
            'publisher_id' => 'required',
            'category_id' => 'required'
        ];
    }

    public function failedValidation($validator)
    {
        throw new HttpResponseException(response()->json([
            'case' => 'validation_error',
            'message' => 'Validation errors',
            'errors' => $validator->errors()
        ]));
    }
}
