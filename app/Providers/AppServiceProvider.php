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

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
