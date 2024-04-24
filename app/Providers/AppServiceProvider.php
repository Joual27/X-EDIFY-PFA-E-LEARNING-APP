<?php

namespace App\Providers;

use App\Repositories\interfaces\AdminRepositoryInterface;
use App\Repositories\interfaces\StudentRepositoryInterface;
use App\Services\interfaces\AdminServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(\App\Services\interfaces\AuthenticationServiceInterface::class, \App\Services\implementations\AuthenticationService::class);
        $this->app->bind(\App\Repositories\interfaces\UserRepositoryInterface::class, \App\Repositories\implementations\UserRepository::class);
        $this->app->bind(\App\Repositories\interfaces\CourseRepositoryInterface::class, \App\Repositories\implementations\CourseRepository::class);
        $this->app->bind(\App\Services\interfaces\CourseServiceInterface::class, \App\Services\implementations\CourseService::class);
        $this->app->bind(\App\Services\interfaces\StudentServiceInterface::class, \App\Services\implementations\StudentService::class);
        $this->app->bind(StudentRepositoryInterface::class, \App\Repositories\implementations\StudentRepository::class);
        $this->app->bind(AdminRepositoryInterface::class, \App\Repositories\implementations\AdminRepository::class);

        $this->app->bind(AdminServiceInterface::class, \App\Services\implementations\AdminService::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
