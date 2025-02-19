"use client";

import { useState, useEffect } from "react";
import { getStudents, getCourses } from "@/app/lib/actions";
import CreateProgressForm from "@/app/ui/dashboard/create-progress-form";

export default function CreateProgressPage() {
  const [students, setStudents] = useState<{ id: string; name: string }[]>([]);
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, coursesData] = await Promise.all([
          getStudents(),
          getCourses(),
        ]);
        setStudents(studentsData);
        setCourses(
          coursesData.map((course) => ({ id: course.id, title: course.title }))
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Évaluer un nouvel élève</h1>
      <CreateProgressForm students={students} courses={courses} />
    </main>
  );
}
