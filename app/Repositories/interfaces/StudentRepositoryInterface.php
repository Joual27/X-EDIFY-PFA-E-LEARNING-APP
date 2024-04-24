<?php

namespace App\Repositories\interfaces;

interface StudentRepositoryInterface{
    public function accessCourse($course_id, $student_id);
    public function getAllCoursesOfStudent($student_id);
    public function getEnrollmentData($course_id, $student_id);
    public function getPointsOfStudent($course_id, $student_id);
    public function changePointsOfStudent($course_id, $student_id);
    public function addReview($reviewData);
    public function  checkIfCompletedCourseOfStudent($course_id, $student_id);
    public function getRatingData($course_id);
    public function checkForValidUserData($userData);
}
