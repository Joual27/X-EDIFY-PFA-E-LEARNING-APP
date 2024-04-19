<?php
namespace App\Repositories\implementations;
use App\Models\Category;
use App\Models\Chapter;
use App\Models\Content;
use App\Models\Course;
use App\Models\Temp_Chapter;
use App\Models\Temp_Content;
use App\Models\Temp_Course;
use App\Models\Temp_Topic;
use App\Models\Topic;
use App\Repositories\interfaces\CourseRepositoryInterface;
use Cloudinary\Cloudinary;
use Doctrine\Inflector\Rules\Transformation;

class CourseRepository implements CourseRepositoryInterface{



    private $cloudinary;


    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'url' => env('CLOUDINARY_URL'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
                'secure' => true,
            ],
        ]);
    }

    public function getCategories(){
          return Category::all();
    }
    public function getCourseOnCreationData($publisher_id)
    {
        return Temp_Course::with('chapters.topics.content')->where('publisher_id',$publisher_id)->first();
    }
    public function addCourse($data){
        try {
            if($data['duration_type'] === 'hours'){
                $data['max_duration'] = $data['max_duration'] * 60;
            }
            else if($data['duration_type'] === 'days'){
                $data['max_duration'] = $data['max_duration'] * 60 * 24;
            }
            $imageId = time() . rand(1000, 9999);
            $image = $data['image'];
            $res = $this->cloudinary->uploadApi()->upload($image->getRealPath(), [
                'public_id' => $imageId,
                'resource_type' => 'image',
            ]);
            if($img_link = $res['secure_url']){
                $course = Temp_Course::create([
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'max_duration' => $data['max_duration'],
                    'publisher_id' => $data['publisher_id'],
                    'category_id' => $data['category_id'],
                    'image' => $img_link
                ]);
            }
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


    public function findChapterById($id)
    {
       try{
           return Temp_Chapter::where('id', $id)->first();
       }
       catch (\Exception $e) {
           return $e->getMessage();
       }
    }
    public function findTopicById($id){
        try{
            return Temp_Topic::where('id', $id)->first();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function uploadContent($contentData){
        try{
            $video = $contentData['file'];
            $videoId = time() . rand(1000, 9999);
            $res = $this->cloudinary->uploadApi()->upload($video->getRealPath(),[
                'public_id' => $videoId,
                'resource_type' => 'video',
            ]);

            if($video_url = $res['secure_url']){
                $created_content = Temp_Content::create([
                    'id' => $videoId,
                    'topic_id' => $contentData['topic_id'],
                    'link_to_ressource' => $video_url
                ]);
                return $created_content;
            }
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function finalizeCourseCreation($publisher_id){
         try{
             $courseData = Temp_Course::with('chapters.topics.content')->where('publisher_id',$publisher_id)->first();
             $created_course = Course::create([
                 'title' => $courseData->title,
                 'description' => $courseData->description,
                 'max_duration' => $courseData->max_duration,
                 'publisher_id' => $courseData->publisher_id,
                 'category_id' => $courseData->category_id,
                 'image' => $courseData->image,
             ]);
             foreach($courseData->chapters as $chapter){
                  $created_Chapter = Chapter::create([
                      'title' => $chapter->title,
                      'course_id' => $created_course->id
                  ]);

                  foreach($chapter->topics as $topic){
                      $created_topic =  Topic::create([
                          'title' => $topic->title,
                          'chapter_id' => $created_Chapter->id
                      ]);
                      $temp_content = $topic->content;

                      Content::create([
                         'id' => $temp_content->id,
                         'topic_id' => $created_topic->id,
                          'link_to_ressource' => $temp_content->link_to_ressource
                      ]);
                  }
             }
             Temp_Course::find($courseData->id)->delete();
             return $created_course;
         }
         catch (\Exception $e) {
             return $e->getMessage();
         }
    }



    public function getCoursesOfInstructor($instructor_id)
    {
        try{
            return Course::where('publisher_id',$instructor_id)->paginate(5);
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getCourseById($id){
        try{
            return Course::with('chapters.topics.content')->where('id',$id)->first();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function removeCourse(Course $course)
    {
        try {
            $course->delete();
            return true;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getAllCourses()
    {
        try {
           return Course::with('instructor.user','category')->orderByDesc('created_at')->paginate(5);
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getCourseByTerm($searchTerm){
        try {
           $courses = Course::with('instructor.user', 'category')
                ->where('title', 'like', "{$searchTerm}%")
                ->orWhereHas('category', function ($query) use ($searchTerm) {
                    $query->where('name', 'like', "{$searchTerm}%");
                })
                ->orderByDesc('created_at')
                ->paginate(5) ;
            return $courses->isEmpty() ? null : $courses;
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

}
