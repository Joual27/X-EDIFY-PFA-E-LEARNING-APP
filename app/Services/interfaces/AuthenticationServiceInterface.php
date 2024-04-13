<?php

namespace App\Services\interfaces;

interface AuthenticationServiceInterface
{
    public function authenticate(array $credentials);
    public function registerAsStudent(array $credentials);
    public function registerAsInstructor(array $credentials);
}

?>
