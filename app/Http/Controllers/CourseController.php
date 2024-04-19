<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChapterRequest;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\TopicRequest;
use App\Services\interfaces\CourseServiceInterface;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //
    protected CourseServiceInterface $courseService;

    public function __construct(CourseServiceInterface $courseService){
        $this->courseService = $courseService;
    }
    public function getAllCategories(){
        $res = $this->courseService->fetchAllCategories();
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'categories' => $res['categories']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function getCourseOnCreation($publisher_id){
        $res = $this->courseService->fetchCourseOnCreationData($publisher_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'course_data' => $res['course_data']
            ]);
        }
        else{
            return response()->json([
                'case' => 'empty',
                'course_data' => []
            ]);
        }
    }


    public function createCourse(CourseRequest $request){
        $validated_data = $request->validated();
        $res = $this->courseService->createCourse($validated_data);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'course' => $res['course']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function createChapter(ChapterRequest $request){
        $validated_data = $request->validated();
        $res = $this->courseService->createChapter($validated_data);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'message' => 'chapter created'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function createTopic(TopicRequest $request)
    {
        $validated_data = $request->validated();
        $res = $this->courseService->createTopic($validated_data);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'message' => 'topic created'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function deleteChapter($id){
        $res = $this->courseService->removeChapter($id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'message' => 'chapter deleted'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }
    public function deleteTopic($id){
        $res = $this->courseService->removeTopic($id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'message' => 'topic deleted'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function createContent(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:mp4,mov,ogg,webm',
            'topic_id' => 'required'
        ]);
        $res = $this->courseService->createContent($request);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'content' => $res['content']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function postCourse(Request $request)
    {
        $res = $this->courseService->postCourse($request->publisher_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }
    public function fetchCoursesOfInstructor($instructor_id)
    {
        $res = $this->courseService->fetchCoursesOfInstructor($instructor_id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'courses' => $res['courses']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }
    public function deleteCourse($id)
    {
        $res = $this->courseService->deleteCourse($id);
        if($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'course' => $res['course']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }


    public function fetchAllCourses()
    {
        $res = $this->courseService->fetchAllCourses();
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'courses' => $res['courses']
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

    public function filterCourses(Request $request)
    {
        $res = $this->courseService->filterCourses($request->term);
        if ($res['case'] === 'success'){
            return response()->json([
                'case' => 'success',
                'courses' => $res['courses']
            ]);
        }
        else if($res['case'] === 'empty'){
            return response()->json([
                'case' => 'empty'
            ]);
        }
        else{
            return response()->json([
                'case' => 'error',
                'message' => $res['message']
            ]);
        }
    }

}

