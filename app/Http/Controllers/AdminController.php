<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
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


    public function createUser(CategoryRequest $request)
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


}
