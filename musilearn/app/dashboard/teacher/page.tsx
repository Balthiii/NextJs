"use client";

import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  instrument: string;
  level: string;
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedCourses: Course[] = await response.json();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/courses?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1
        className={`${lusitana.className} mb-6 text-2xl md:text-3xl font-bold text-center`}
      >
        Dashboard
      </h1>
      <div className="flex justify-center mb-6">
        <Link href="/dashboard/course/create">
          <span className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-colors">
            Créer un nouveau cours
          </span>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Instrument: {course.instrument}
            </p>
            <p className="text-sm text-gray-500 mb-4">Niveau: {course.level}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
              <Link href={`/dashboard/course/edit/${course.id}`}>
                <span className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                  Éditer
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
