<?php

namespace App\Services\interfaces;
Interface StudentServiceInterface {
    public function enrollCourse($course_id, $student_id);
    public function fetchCoursesOfStudent($student_id);

    public function fetchEnrollementData($course_id, $student_id);

    public function fetchPointsOfStudent($course_id,$student_id);
    public function updatePointsOfStudent($course_id,$student_id);
    public function makeReview($reviewData);
    public function isCourseCompleted($course_id, $student_id);


    public function fetchRatingData($course_id);

    public function updateUserProfile($userData);
}
