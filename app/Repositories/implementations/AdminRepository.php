<?php


namespace App\Repositories\implementations;


use App\Models\Admin;
use App\Models\Category;
use App\Models\Course;
use App\Models\Instructor;
use App\Models\User;
use App\Repositories\interfaces\AdminRepositoryInterface;

class AdminRepository implements AdminRepositoryInterface
{
    public function getOverallStats(){
      try{
          $allAdminsIds = Admin::all()->pluck('user_id')->toArray();
          $overallNumberOfUsers = User::whereNotIn('id', $allAdminsIds)->count();
          $overallNumberOfCategories = Category::all()->count();
          $overallNumberOfCourses = Course::all()->count();
          $overallNumberOfTeachers = instructor::all()->count();
          return ['success',$overallNumberOfUsers,$overallNumberOfCategories,$overallNumberOfCourses,$overallNumberOfTeachers];
      }
      catch(\Exception $e){
          return $e->getMessage();
      }
    }

    public function getAllUsers(){
       try{
           $allAdminsIds = Admin::all()->pluck('user_id')->toArray();
           return User::with('student','instructor')->whereNotIn('id', $allAdminsIds)->get();
       }
       catch(\Exception $e){
           return $e->getMessage();
       }
    }
    public function getAllCategories(){
        try{
            return Category::all();
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

}
