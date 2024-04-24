<?php


namespace App\Services\interfaces;

interface AdminServiceInterface{
    public function fetchAdminStats();
    public function fetchAllUsers();
    public function fetchAllCategories();
    public function createCategory($category_name);
    public function getCategoryData($category_id);
    public function updateCategory($category_name, $category_id);

    public function banUser($id);
}
