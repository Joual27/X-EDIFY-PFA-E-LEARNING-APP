<?php

namespace App\Repositories\interfaces;


interface AdminRepositoryInterface{
    public function getOverallStats();
    public function getAllUsers();
    public function getAllCategories();
    public function addCategory($category_name);
    public function findCategoryById($id);
    public function editCategory($category_name,$id);
    public function denyAccessOfUser($id);

}
