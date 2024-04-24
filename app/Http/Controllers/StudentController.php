<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Repositories\interfaces\StudentRepositoryInterface;
use App\Services\interfaces\StudentServiceInterface;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    protected StudentServiceInterface $studentService;
    public function __construct(StudentServiceInterface $studentService){
        $this->studentService = $studentService;
    }

    public function enrollCourse(Request $request){
        $res = $this->studentService->enrollCourse($request->course_id,$request->student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else if($res['case'] === 'exists'){
            return response()->json([
                'case' => 'exists'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function fetchAllCoursesOfStudent($student_id){
        $res = $this->studentService->fetchCoursesOfStudent($student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'courses' => $res['courses']
            ]);
        }
        else if ($res['case'] === 'empty'){
            return response()->json([
                'case' => 'empty'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function fetchEnrollementData(Request $request)
    {
        $res = $this->studentService->fetchEnrollementData($request->course_id,$request->student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'enrollment' => $res['enrollment']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function fetchPointsOfStudent($course_id, $student_id)
    {
        $res = $this->studentService->fetchPointsOfStudent($course_id, $student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'points' => $res['points']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function updatePointsOfStudent(Request $request)
    {
        $res = $this->studentService->updatePointsOfStudent($request->course_id,$request->student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'points' => $res['points']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function createReview(Request $request)
    {
        $res = $this->studentService->makeReview($request);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',

            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }
    public function markCourseAsCompleted(Request $request){
        $res = $this->studentService->markCourseAsCompleted($request->course_id,$request->student_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function isCourseCompleted($course_id,$student_id)
    {
        $res = $this->studentService->isCourseCompleted($course_id,$student_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'state' => $res['state']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }

    }

    public function fetchRatingData($course_id)
    {
        $res = $this->studentService->fetchRatingData($course_id);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'avg_rating' => $res['avg_rating'],
                'ratings_count' => $res['ratings_count'],
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $validated_data =  $request->validated();
        $res = $this->studentService->updateUserProfile($validated_data);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'user' => $res['user']
            ]);
        }
        else if($res['case'] === 'incorrect_pw'){
            return response()->json([
                'case' => 'incorrect_pw'
            ]);
        }
        else if($res['case'] === 'validation_error'){
            return response()->json([
                'case' => 'validation_error',
                'errors' => $res['errors']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

}
