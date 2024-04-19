<?php

namespace App\Services\implementations;

use App\Models\Course;
use App\Models\Temp_Chapter;
use App\Models\Temp_Content;
use App\Models\Temp_Course;
use App\Models\Temp_Topic;
use App\Repositories\interfaces\CourseRepositoryInterface;
use App\Services\interfaces\CourseServiceInterface;

class CourseService implements CourseServiceInterface
{
    protected CourseRepositoryInterface $courseRepository;
    public function __construct(CourseRepositoryInterface $courseRepository){
        $this->courseRepository = $courseRepository;
    }
    public function fetchAllCategories()
    {
        $categories = $this->courseRepository->getCategories();
        if($categories){
            return [
                'case' => 'success',
                'categories' => $categories
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => 'Failed fetching categories',
            ];
        }
    }

    public function fetchCourseOnCreationData($publisher_id){
       $courseData = $this->courseRepository->getCourseOnCreationData($publisher_id);
        if($courseData){
            return [
                'case' => 'success',
                'course_data' => $courseData
            ];
        }
        else{
            return [
                'case' => 'empty'
            ];
        }
    }

    public function createCourse($data)
    {
        $res = $this->courseRepository->addCourse($data);
        if($res instanceof Temp_Course){
            return [
                'case' => 'success',
                'course' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function createChapter($chapter){
        $res = $this->courseRepository->addChapter($chapter);

        if($res instanceof Temp_Chapter){
            return [
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

    public function createTopic($topic){
        $res = $this->courseRepository->addTopic($topic);
        if($res instanceof Temp_Topic){
            return[
                'case' => 'success'
            ];
        }
        return [
            'case' => 'error',
            'message' => $res
        ];
    }

    public function removeChapter($id)
    {
        $res = $this->courseRepository->findChapterById($id);
        if($res instanceof Temp_Chapter){
            $res->delete();
            return [
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
    public function removeTopic($id){
        $res = $this->courseRepository->findTopicById($id);
        if($res instanceof Temp_Topic){
            $res->delete();
            return [
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
    public function createContent($contentData){
        $res = $this->courseRepository->uploadContent($contentData);
        if($res instanceof Temp_Content){
            return[
                'case' => 'success',
                'content' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }
    public function postCourse($publisher_id){
        $res = $this->courseRepository->finalizeCourseCreation($publisher_id);
        if($res instanceof Course){
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
    public function fetchCoursesOfInstructor($instructor_id){
        $res = $this->courseRepository->getCoursesOfInstructor($instructor_id);
        if($res[0] instanceof Course){
            return[
                'case' => 'success',
                'courses' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function deleteCourse($id)
    {
        $res = $this->courseRepository->getCourseById($id);
        if($res instanceof Course){
            $outcome = $this->courseRepository->removeCourse($res);
            if ($outcome === true){
                return[
                    'case' => 'success',
                    'course' => $res
                ];
            }
            else{
                return [
                    'case' => 'error',
                    'message' => $res
                ];
            }
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function fetchAllCourses()
    {
        $res = $this->courseRepository->getAllCourses();
        if($res[0] instanceof Course){
            return[
                'case' => 'success',
                'courses' => $res
            ];
        }
        else{
            return [
                'case' => 'error',
                'message' => $res
            ];
        }
    }

    public function filterCourses($searchTerm)
    {
        $res = $this->courseRepository->getCourseByTerm($searchTerm);
        if($res){
            return[
                'case' => 'success',
                'courses' => $res
            ];
        }
        else if($res === null){
            return[
                'case' => 'empty',
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
