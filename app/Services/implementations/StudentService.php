<?php

namespace App\Services\implementations;


use App\Models\Course;
use App\Models\CoursesOfStudent;
use App\Models\Review;
use App\Models\User;
use App\Repositories\implementations\StudentRepository;
use App\Repositories\interfaces\StudentRepositoryInterface;
use App\Services\interfaces\StudentServiceInterface;

class StudentService implements StudentServiceInterface{

    protected StudentRepositoryInterface $studentRepository;
    public function __construct(StudentRepositoryInterface $studentRepository){
        $this->studentRepository = $studentRepository;
    }
    public function enrollCourse($course_id, $student_id){
        $res = $this->studentRepository->accessCourse($course_id, $student_id);
        if ($res instanceof CoursesOfStudent){
            return [
                'case' => 'success'
            ];
        }
        else if($res === 'exists'){
            return [
               'case' => 'exists'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }
    public function fetchCoursesOfStudent($student_id){
        $res = $this->studentRepository->getAllCoursesOfStudent($student_id);
        if ($res[0] instanceof Course){
            return [
                'case' => 'success',
                'courses' => $res
            ];
        }
        elseif ($res == []){
            return [
                'case' => 'empty'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }


    public function fetchEnrollementData($course_id, $student_id){
        $res = $this->studentRepository->getEnrollmentData($course_id, $student_id);
        if ($res instanceof CoursesOfStudent){
            return [
                'case' => 'success',
                'enrollment' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function fetchPointsOfStudent($course_id,$student_id){
        $res = $this->studentRepository->getPointsOfStudent($course_id, $student_id);
        if ($res instanceof CoursesOfStudent){
           return[
               'case' => 'success',
               'points' => $res->points
           ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }
    public function updatePointsOfStudent($course_id,$student_id){
        $res = $this->studentRepository->changePointsOfStudent($course_id,$student_id);
        if ($res instanceof CoursesOfStudent){
            return[
                'case' => 'success',
                'points' => $res->points
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }

    }

    public function makeReview($reviewData){
        $res = $this->studentRepository->addReview($reviewData);
        if ($res instanceof Review){
            return[
                'case' => 'success'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function markCourseAsCompleted($course_id,$student_id){
        $res = $this->studentRepository->setCourseCompleted($course_id,$student_id);
        if($res instanceof CoursesOfStudent){
            return[
                'case' => 'success'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function isCourseCompleted($course_id, $student_id){
        $res = $this->studentRepository->checkIfCompletedCourseOfStudent($course_id, $student_id);
        if ($res === true || $res === false){
            return[
                'case' => 'success',
                'state' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }

    }


    public function fetchRatingData($course_id){
        $res = $this->studentRepository->getRatingData($course_id);
        if ($res[0] === 'success'){
            return[
                'case' => 'success',
                'avg_rating' => $res[1],
                'ratings_count' => $res[2],
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function updateUserProfile($userData){
        $res = $this->studentRepository->checkForValidUserData($userData);
        if ($res instanceof User){
            return [
                'case' => 'success',
                'user' => $res
            ];
        }
        else if ($res === null){
            return [
                'case' => 'incorrect_pw'
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }

    }





}
