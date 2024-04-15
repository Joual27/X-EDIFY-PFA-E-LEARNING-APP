<?php
namespace App\Repositories\interfaces;

interface CourseRepositoryInterface {
    public function getCategories();
    public function getCourseOnCreationData($publisher_id);
    public function addCourse($data);
    public function addChapter($data);
    public function addTopic($data);

}

