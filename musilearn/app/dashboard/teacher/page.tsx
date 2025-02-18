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
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Link href="/dashboard/course/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Créer un nouveau cours
        </button>
      </Link>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.instrument}</p>
            <p>{course.level}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(course.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Supprimer
              </button>
              <Link href={`/dashboard/course/edit/${course.id}`}>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
                  Éditer
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
