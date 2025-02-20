"use client";

import { useState, useEffect } from "react";
import { enrollInCourse, fetchCourses } from "@/app/lib/actions";
import { Course } from "@/app/lib/definitions";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchData();

    const storedStudentId = localStorage.getItem("studentId");
    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      if (!studentId) {
        alert("Vous devez être connecté pour vous inscrire à un cours.");
        return;
      }
      await enrollInCourse(studentId, courseId);
      alert("Inscription réussie !");
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      alert("Échec de l'inscription.");
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-2xl md:text-3xl font-bold text-center">
        Liste des Cours
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500 mb-2">Niveau: {course.level}</p>
            <button
              onClick={() => handleEnroll(course.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
