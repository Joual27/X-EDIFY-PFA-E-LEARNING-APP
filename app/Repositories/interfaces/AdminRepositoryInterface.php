<?php

namespace App\Repositories\interfaces;


interface AdminRepositoryInterface{
    public function getOverallStats();
    public function getAllUsers();
    public function getAllCategories();
}
