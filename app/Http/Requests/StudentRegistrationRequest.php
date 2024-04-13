<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StudentRegistrationRequest extends FormRequest
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
            'name' => 'required|string',
            'email' => 'required|email|string|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'confirm_pw' => 'required|string|min:6|same:password',
            'school' => 'required|string',
//            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:1024',
        ];
    }

    public function failedValidation($validator)
    {
        throw new HttpResponseException(response()->json([
            'case' => 'validation_error',
            'errors' => $validator->errors()
        ]));
    }
}
