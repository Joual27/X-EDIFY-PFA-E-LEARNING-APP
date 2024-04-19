<?php

namespace App\Services\implementations;

use App\Models\User;
use App\Repositories\interfaces\UserRepositoryInterface;
use App\Services\interfaces\AuthenticationServiceInterface;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTFactory;

class AuthenticationService implements AuthenticationServiceInterface
{
    protected UserRepositoryInterface $userRepository;
    public function __construct(UserRepositoryInterface $userRepository)
    {
       $this->userRepository = $userRepository;
    }
    public function authenticate(array $credentials){
       $logging_user = $this->userRepository->findUserByEmail($credentials['email']);
       if($logging_user){
           if(Auth::attempt($credentials)){
               $token = auth()->guard('api')->login($logging_user);
               if($logging_user->is_admin()){
                   return [
                       'case' => 'success',
                       'user' => $logging_user,
                       'role' => 'admin',
                       'token' => $token
                   ];
               }
               else if($logging_user->is_student()){
                   return [
                       'case' => 'success',
                       'user' => $logging_user,
                       'role' => 'student',
                       'token' => $token
                   ];
               }
               else if($logging_user->is_instructor()){
                   return [
                       'case' => 'success',
                       'user' => $logging_user,
                       'role' => 'instructor',
                       'token' => $token
                   ];
               }

           }
           else{
               return [
                  'case' => 'incorrect_password',
               ] ;
           }
       }
       else{
           return [
               'case' => 'invalid_email',
           ];
       }
    }
    public function registerAsStudent(array $credentials)
    {
        $created_student = $this->userRepository->createStudent($credentials);
        if ($created_student instanceof User) {
            $token = auth()->guard('api')->login($created_student);
            return [
                'token' => $token,
                'student' => $created_student
            ];
        } else {
            return response()->json([
                'case' => 'error',
                'message' => 'Failed to create student',
            ], 400);
        }
    }
    public function registerAsInstructor(array $credentials){
        $created_instructor = $this->userRepository->createInstructor($credentials);
        if ($created_instructor instanceof User) {
            $token = auth()->guard('api')->login($created_instructor);
            return [
                'token' => $token,
                'instructor' => $created_instructor
            ];
        } else {
            return response()->json([
                'case' => 'error',
                'message' => 'Failed to create student',
            ], 400);
        }
    }



}

?>
