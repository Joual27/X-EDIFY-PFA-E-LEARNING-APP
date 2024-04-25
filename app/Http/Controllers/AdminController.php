<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Admin;
use App\Models\User;
use App\Services\implementations\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected AdminService $adminService;
    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }
    public function fetchStats(){
        $res = $this->adminService->fetchAdminStats();
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'data' => [
                    'totalUsers' => $res['stats']['totalUsers'],
                    'totalCategories' => $res['stats']['totalCategories'],
                    'totalCourses' => $res['stats']['totalCourses'],
                    'totalTeachers' => $res['stats']['totalTeachers']
                ]
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function fetchAllUsers()
    {
        $res = $this->adminService->fetchAllUsers();
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'users' => $res['users']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function fetchAllCategories()
    {
       $res = $this->adminService->fetchAllCategories();
       if($res['case'] === 'success'){
           return response()->json([
               'case' => 'success',
               'categories' => $res['categories']
           ]);
       }
       else{
           return response()->json([
               'case' => 'error',
               'message' => $res['message']
           ]);
       }
    }


    public function createCategory(CategoryRequest $request)
    {
        $validated_data = $request->validated();
        $res = $this->adminService->createCategory($validated_data['name']);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function getCategoryData($category_id)
    {
        $res = $this->adminService->getCategoryData($category_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'category' => $res
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function fetchCategoryData($category_id)
    {
        $res = $this->adminService->getCategoryData($category_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'category' => $res['category']
            ]);
        }
        else{
            return [
                'case' => 'error',
                'message' => $res['message']
            ];
        }
    }

    public function updateCategory(CategoryRequest $request, $category_id)
    {
        $request= $request->validated();
        $res = $this->adminService->updateCategory($request['name'],$category_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function deleteCategory($id)
    {
        $res = $this->adminService->deleteCategory($id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function banUser($id)
    {
        $res = $this->adminService->banUser($id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }





}
