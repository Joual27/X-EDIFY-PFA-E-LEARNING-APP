<?php


namespace App\Services\interfaces;

interface AdminServiceInterface{
    public function fetchAdminStats();
    public function fetchAllUsers();
    public function fetchAllCategories();
    public function createCategory($category_name);

}
