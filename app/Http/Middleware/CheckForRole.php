<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckForRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$role): Response
    {
        $user = \auth()->user();
        if(!$user || $user->getUserRole() !==  $role){
            return \response()->json([
                'status' => 'no_permissions',
                'message' => 'Sorry , u have no permissions to perform this action'
            ]);
        }
        return $next($request);
    }
}
