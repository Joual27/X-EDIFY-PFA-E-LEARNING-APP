<?php

namespace App\Services\implementations;


use App\Models\Category;
use App\Models\User;
use App\Repositories\interfaces\AdminRepositoryInterface;
use App\Services\interfaces\AdminServiceInterface;

class AdminService implements AdminServiceInterface{

    protected AdminRepositoryInterface $adminRepository;
    public function __construct(AdminRepositoryInterface $adminRepository){
        $this->adminRepository = $adminRepository;
    }
    public function fetchAdminStats(){
        $res = $this->adminRepository->getOverallStats();
        if ($res[0] === 'success'){
            return[
                'case' => 'success',
                'stats' => [
                    'totalUsers' => $res[1],
                    'totalCategories' => $res[2],
                    'totalCourses' => $res[3],
                    'totalTeachers' => $res[3],
                ]
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function fetchAllUsers(){
        $res = $this->adminRepository->getAllUsers();
        if ($res[0] instanceof User){
            return [
                'case' => 'success',
                'users' => $res,
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function fetchAllCategories(){
        $res = $this->adminRepository->getAllCategories();
        if ($res[0] instanceof Category){
            return [
                'case' => 'success',
                'categories' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function createCategory($category_name)
    {
        $res = $this->adminRepository->addCategory($category_name);
        if ($res instanceof Category){
            return[
                'case' => 'success'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }


}
