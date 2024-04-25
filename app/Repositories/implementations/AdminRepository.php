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
          $overallNumberOfTeachers = Instructor::all()->count();
          return ['success',$overallNumberOfUsers,$overallNumberOfCategories,$overallNumberOfCourses,$overallNumberOfTeachers];
      }
      catch(\Exception $e){
          return $e->getMessage();
      }
    }

    public function getAllUsers(){
       try{
           $allAdminsIds = Admin::all()->pluck('user_id')->toArray();
           return User::with('student','instructor')->whereNull('banned_at')->whereNotIn('id', $allAdminsIds)->get();
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
    public function addCategory($category_name){
        try{
            return Category::create([
                'name' => $category_name
            ]);
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }
    public function findCategoryById($id)
    {
        try{
            return Category::find($id);
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function editCategory($category_name,$id)
    {
       try{
           $category = Category::find($id);
           $category->name = $category_name;
           $category->save();
           return $category;
       }
       catch(\Exception $e){
           return $e->getMessage();
       }
    }

    public function removeCategory($id){
        try{
            $category =  Category::find($id)->delete();
            return true;
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }

    public function denyAccessOfUser($id){
        try{
            $user = User::find($id);
            $user->banned_at = now();
            $user->save();
            return $user;
        }
        catch(\Exception $e){
            return $e->getMessage();
        }
    }


}
