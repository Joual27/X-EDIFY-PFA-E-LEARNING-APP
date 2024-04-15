<?php

namespace App\Services\interfaces;

interface CourseServiceInterface{
    public function fetchAllCategories();
    public function fetchCourseOnCreationData($publisher_id);
    public function createCourse($course);
    public function createChapter($chapter);
    public function createTopic($topic);
}
