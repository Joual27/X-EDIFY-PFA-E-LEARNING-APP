<?php
namespace App\Repositories\interfaces;

use App\Models\Course;

interface CourseRepositoryInterface {
    public function getCategories();
    public function getCourseOnCreationData($publisher_id);
    public function addCourse($data);
    public function addChapter($data);
    public function addTopic($data);
    public function findChapterById($id);
    public function findTopicById($id);
    public function uploadContent($contentData);
    public function getCoursesOfInstructor($instructor_id);
    public function getCourseById($id);
    public function removeCourse(Course $course);
    public function getAllCourses();

    public function getCourseByTerm($searchTerm);
    public function getCoursesOfCategory($category_id);

}

