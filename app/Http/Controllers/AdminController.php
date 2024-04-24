<?php

namespace App\Http\Controllers;

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

    }


}
