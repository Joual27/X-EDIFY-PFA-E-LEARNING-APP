<?php


namespace App\Repositories\interfaces;
interface UserRepositoryInterface{
    public function findUserByEmail($email);
    public function createStudent($credentials);
    public function createInstructor($credentials);

}

?>
