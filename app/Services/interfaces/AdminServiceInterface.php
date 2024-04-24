<?php


namespace App\Services\interfaces;

interface AdminServiceInterface{
    public function fetchAdminStats();
    public function fetchAllUsers();
    public function fetchAllCategories();
}
