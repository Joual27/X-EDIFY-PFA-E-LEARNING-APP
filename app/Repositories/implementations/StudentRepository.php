<?php

namespace App\Repositories\implementations;

use App\Models\Course;
use App\Models\CoursesOfStudent;
use App\Models\Review;
use App\Models\Student;
use App\Models\User;
use App\Repositories\interfaces\StudentRepositoryInterface;
use Cloudinary\Cloudinary;
use Dflydev\DotAccessData\Data;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentRepository implements StudentRepositoryInterface
{
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

    public function accessCourse($course_id, $student_id)
    {
        try {
            $student = Student::find($student_id);
            $courses_of_student = $student->courses->pluck('id')->toArray();
            if (in_array($course_id, $courses_of_student)) {
                return 'exists';
            }
            return CoursesOfStudent::create([
                'course_id' => $course_id,
                'student_id' => $student_id
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getAllCoursesOfStudent($student_id)
    {
        try {
            $student = Student::find($student_id);
            $courses = $student->courses()->paginate(5);
            if ($courses != null) {
                return $courses;
            } else {
                return [];
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function getEnrollmentData($course_id, $student_id)
    {
        try {
            return CoursesOfStudent::where('course_id', $course_id)->where('student_id', $student_id)->first();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function getPointsOfStudent($course_id, $student_id)
    {
        try {
            return CoursesOfStudent::where('course_id', $course_id)->where('student_id', $student_id)->first();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function changePointsOfStudent($course_id, $student_id)
    {
        try {
            $course_of_student = CoursesOfStudent::where('course_id', $course_id)->where('student_id', $student_id)->first();
            $course_of_student->points = $course_of_student->points + 50;
            $course_of_student->save();
            return $course_of_student;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function addReview($reviewData)
    {
        try {
            return Review::create([
                'course_id' => $reviewData['course_id'],
                'student_id' => $reviewData['student_id'],
                'rating' => $reviewData['rating']
            ]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function setCourseCompleted($course_id, $student_id)
    {
        try {
            $course_of_student = CoursesOfStudent::where('course_id', $course_id)->where('student_id', $student_id)->first();
            $course_of_student->completed_at = now();
            $course_of_student->save();
            return $course_of_student;
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }

    public function checkIfCompletedCourseOfStudent($course_id, $student_id)
    {
        try {
            $course = CoursesOfStudent::where('course_id', $course_id)->where('student_id', $student_id)->first();
            if ($course->completed_at != null) {
                return true;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function getRatingData($course_id)
    {
        try {
            $res = DB::table('reviews')
                ->selectRaw('ROUND(AVG(rating), 2) as average_rating, COUNT(*) as reviews_count')
                ->where('course_id', $course_id)->first();
            return ['success', $res->average_rating, $res->reviews_count];
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function checkForValidUserData($userData)
    {
        try {
            $user = \auth()->user();
            $old_password = $userData['old_password'];
            if (Hash::check($old_password, $user->password)) {
                $user->password = bcrypt($userData['new_password']);
                if ($userData['image']) {
                    $result = $this->cloudinary->uploadApi()->upload($userData['image']->getRealPath(), [
                        'public_id' => $user->id * 128,
                        'resource_type' => 'image',
                    ]);
                    if ($link = $result['secure_url']) {
                        $user->image = $link;
                    }
                }
                $user->save();
               return User::with('student','instructor')->where('id',$user->id)->first();

            } else {
                return null;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
