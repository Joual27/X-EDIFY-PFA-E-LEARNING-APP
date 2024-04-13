<?php
namespace App\Repositories\implementations;
use App\Repositories\interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface{
    public function findUserByEmail($email){
        $user = \App\Models\User::where('email',$email)->first();
        return $user;
    }
    public function createStudent($credentials){
        try {
            $user = \App\Models\User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => $credentials['password'],
            ]);
            \App\Models\Student::create([
                'user_id' => $user->id,
                'school' => $credentials['school']
            ]);
            return $user;
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function createInstructor($credentials){
        try {
            $user = \App\Models\User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => $credentials['password'],
            ]);
            \App\Models\Instructor::create([
                'user_id' => $user->id,
                'field' => $credentials['field']
            ]);
            return $user;
        }
        catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
?>
