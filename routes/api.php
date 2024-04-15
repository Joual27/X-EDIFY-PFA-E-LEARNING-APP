<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register/student', [\App\Http\Controllers\AuthController::class, 'studentRegistration']);
Route::post('register/instructor', [\App\Http\Controllers\AuthController::class, 'instructorRegistration']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);



Route::get('categories/all', [\App\Http\Controllers\CourseController::class, 'getAllCategories']);
Route::get('course/data/{publisher_id}', [\App\Http\Controllers\CourseController::class, 'getCourseOnCreation']);
Route::post('course/create', [\App\Http\Controllers\CourseController::class, 'createCourse']);
Route::post('chapter/create', [\App\Http\Controllers\CourseController::class, 'createChapter']);
Route::post('topic/create', [\App\Http\Controllers\CourseController::class, 'createTopic']);

