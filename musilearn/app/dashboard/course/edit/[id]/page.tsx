"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import EditCourseForm from "@/app/ui/dashboard/edit-form";
import { fetchCourseById } from "@/app/lib/actions";
import { getTeachers } from "@/app/lib/actions";
import { Course } from "@/app/lib/definitions";

export default function EditCourse() {
  const router = useRouter();
  const params = useParams();
  const id = params ? params.id : null;
  const [course, setCourse] = useState<Course | null>(null);
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const fetchedCourse = await fetchCourseById(id as string);
        const fetchedTeachers = await getTeachers();
        setCourse(fetchedCourse);
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Éditer le cours</h1>
      <EditCourseForm initialData={course} teachers={teachers} />
    </main>
  );
}
