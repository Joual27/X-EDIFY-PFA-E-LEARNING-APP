<?php
namespace App\Repositories\implementations;
use App\Models\Category;
use App\Models\Temp_Chapter;
use App\Models\Temp_Course;
use App\Models\Temp_Topic;
use App\Repositories\interfaces\CourseRepositoryInterface;
class CourseRepository implements CourseRepositoryInterface{
    public function getCategories(){
          return Category::all();
    }
    public function getCourseOnCreationData($publisher_id)
    {
        return Temp_Course::with('chapters.topics.content')->where('publisher_id',$publisher_id)->first();
    }
    public function addCourse($data){
        if($data['duration_type'] === 'hours'){
            $data['max_duration'] = $data['max_duration'] * 60;
        }
        else if($data['duration_type'] === 'days'){
            $data['max_duration'] = $data['max_duration'] * 60 * 24;
        }

        try {
            $course = Temp_Course::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'max_duration' => $data['max_duration'],
                'publisher_id' => $data['publisher_id'],
                'category_id' => $data['category_id']
            ]);
            return $course;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function addChapter($data)
    {
       try{
           $chapter = Temp_Chapter::create([
               'title' => $data['title'],
               'course_id' => $data['course_id'],
           ]);
           return $chapter;
       }
       catch (\Exception $e) {
           return $e->getMessage();
       }
    }

    public function addTopic($data){
        try{
            $topic = Temp_Topic::create([
                'title' => $data['title'],
                'chapter_id' => $data['chapter_id']
            ]);
            return $topic;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }


}
