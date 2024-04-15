<?php

namespace App\Providers;

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

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
