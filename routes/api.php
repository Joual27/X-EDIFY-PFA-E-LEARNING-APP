<?php

use App\Http\Controllers\AdminController;
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


Route::get('/admin/stats',[AdminController::class,'fetchStats']);
Route::get('/admin/users/all',[AdminController::class,'fetchAllUsers']);
Route::get('/admin/categories/all',[AdminController::class,'fetchAllCategories']);
Route::get('/category/data/{category_id}',[AdminController::class,'getCategoryData']);
Route::post('/admin/category/create',[AdminController::class,'createCategory']);
Route::get('/admin/category/{category_id}/data',[AdminController::class,'fetchCategoryData']);
Route::post('/admin/category/{category_id}/update',[AdminController::class,'updateCategory']);
Route::delete('/admin/category/{id}/delete',[AdminController::class,'deleteCategory']);
Route::put('/admin/user/{id}/ban',[AdminController::class,'banUser']);


Route::middleware('guest')->group(function () {
    Route::post('register/student', [\App\Http\Controllers\AuthController::class, 'studentRegistration']);
    Route::post('register/instructor', [\App\Http\Controllers\AuthController::class, 'instructorRegistration']);
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});

Route::get('courses/public/all', [\App\Http\Controllers\CourseController::class, 'fetchAllCourses']);
Route::get('categories/top/3',[\App\Http\Controllers\CourseController::class, 'fetchTopCategories']);
Route::get('course/details/{course_id}',[\App\Http\Controllers\CourseController::class,'fetchCourseData']);
Route::post('course/enroll',[\App\Http\Controllers\StudentController::class,'enrollCourse']);
Route::Post('courses/filter',[\App\Http\Controllers\CourseController::class, 'filterCourses']);
Route::get('course/{course_id}/reviews/data',[\App\Http\Controllers\StudentController::class,'fetchRatingData']);
Route::get('category/courses/{category_id}',[\App\Http\Controllers\CourseController::class,'filterCoursesByCategory']);


Route::middleware('auth:api')->group(function (){
    Route::get('course/data/{publisher_id}', [\App\Http\Controllers\CourseController::class, 'getCourseOnCreation']);
    Route::get('categories/all', [\App\Http\Controllers\CourseController::class, 'getAllCategories']);
    Route::post('course/create', [\App\Http\Controllers\CourseController::class, 'createCourse']);
    Route::post('chapter/create', [\App\Http\Controllers\CourseController::class, 'createChapter']);
    Route::post('topic/create', [\App\Http\Controllers\CourseController::class, 'createTopic']);
    Route::delete('chapter/delete/{id}', [\App\Http\Controllers\CourseController::class, 'deleteChapter']);
    Route::delete('topic/delete/{id}', [\App\Http\Controllers\CourseController::class, 'deleteTopic']);
    Route::post('content/create', [\App\Http\Controllers\CourseController::class, 'createContent']);

    Route::post('course/post', [\App\Http\Controllers\CourseController::class, 'postCourse']);
    Route::get('instructor/{instructor_id}/courses', [\App\Http\Controllers\CourseController::class, 'fetchCoursesOfInstructor']);
    Route::delete('course/delete/{id}', [\App\Http\Controllers\CourseController::class, 'deleteCourse']);

    Route::get('student/courses/{student_id}',[\App\Http\Controllers\StudentController::class,'fetchAllCoursesOfStudent']);
    Route::post('enrollment/data',[\App\Http\Controllers\StudentController::class,'fetchEnrollementData']);

    Route::get('course/{course_id}/student/{student_id}/points',[\App\Http\Controllers\StudentController::class,'fetchPointsOfStudent']);
    Route::post('student/points/update',[\App\Http\Controllers\StudentController::class,'updatePointsOfStudent']);
    Route::post('course/review/create',[\App\Http\Controllers\StudentController::class,'createReview']);
    Route::post('course/completed/finalize',[\App\Http\Controllers\StudentController::class,'markCourseAsCompleted']);
    Route::get('course/completed/{course_id}/{student_id}',[\App\Http\Controllers\StudentController::class,'isCourseCompleted']);
    Route::post('profile/update',[\App\Http\Controllers\StudentController::class,'updateProfile']);
});
