<?php

namespace App\Services\interfaces;

interface CourseServiceInterface{
    public function fetchAllCategories();
    public function fetchCourseOnCreationData($publisher_id);
    public function createCourse($course);
    public function createChapter($chapter);
    public function createTopic($topic);
    public function removeTopic($id);
    public function removeChapter($id);
    public function createContent($contentData);
    public function fetchCoursesOfInstructor($instructor_id);
    public function deleteCourse($id);

    public function fetchAllCourses();

    public function filterCourses($searchTerm);
    public function fetchTopCategories();

    public function filterCoursesByCategory($categoryId);
    public function getAllCourseData($course_id);

}
