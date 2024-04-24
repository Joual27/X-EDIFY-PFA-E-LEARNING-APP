<?php

namespace App\Http\Controllers;
use App\Http\Requests\InstructorRegistrationRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StudentRegistrationRequest;
use App\Services\interfaces\AuthenticationServiceInterface;

class AuthController extends Controller
{
    protected AuthenticationServiceInterface $authService;


    public function __construct(AuthenticationServiceInterface $authService)
    {
       $this->authService = $authService;
    }
    public function studentRegistration(StudentRegistrationRequest $request){
        $validated_data = $request->validated();
        $res = $this->authService->registerAsStudent($validated_data);
        if (isset($res['token'])) {
            return response()->json([
                'case' => 'success',
                'message' => 'Student created successfully',
                'student' => $res['student'],
                'authorisation' => [
                    'token' => $res['token'],
                    'type' => 'bearer',
                ]
            ]);
        } else {
            return response()->json([
                'case' => 'error',
                'message' => 'Failed to create student',
            ],400);
        }
    }
    public function instructorRegistration(InstructorRegistrationRequest $request){
        $validated_data = $request->validated();
        $res = $this->authService->registerAsInstructor($validated_data);
        if (isset($res['token'])) {
            return response()->json([
                'case' => 'success',
                'message' => 'Instructor created successfully',
                'instructor' => $res['instructor'],
                'authorisation' => [
                    'token' => $res['token'],
                    'type' => 'bearer',
                ]
            ]);
        } else {
            return response()->json([
                'case' => 'error',
                'message' => 'Failed to create Instructor',
            ],400);

        }
    }
    public function login(LoginRequest $request)
    {
        $validated_data = $request->validated();
        $res = $this->authService->authenticate($validated_data);
        if($res['case'] === 'success'){
            return response()->json([
               'case' => 'success',
               'message' => 'Logged In successfully',
                'role' => $res['role'],
                'user' => $res['user'],
                'authorisation' => [
                    'token' => $res['token'],
                    'type' => 'bearer',
                ]
            ]);
        }
        elseif($res['case'] === 'incorrect_password'){
            return response()->json([
                'case' => 'incorrect_password',
                'message' => 'Incorrect password',
            ]);
        }
        else if($res['case'] === 'banned'){
            return response()->json([
                'case' => 'banned',
            ]);
        }
        else{
            return response()->json([
                'case' => 'invalid_email',
                'message' => 'Invalid email',
            ]);
        }
    }

}
