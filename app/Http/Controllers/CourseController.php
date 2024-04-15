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

}

