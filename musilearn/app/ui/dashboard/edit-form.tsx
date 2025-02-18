"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/lib/actions";
import { Course } from "@/app/lib/definitions";

interface EditCourseFormProps {
  initialData: Course;
  teachers: { id: string; name: string }[];
}

export default function EditCourseForm({
  initialData,
  teachers,
}: EditCourseFormProps) {
  const [course, setCourse] = useState<Course>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("instrument", course.instrument);
      formData.append("level", course.level);
      formData.append("schedule", course.schedule);
      formData.append("capacity", course.capacity.toString());
      await updateCourse(course.id, formData);
      setIsSubmitted(true);
      router.push("/dashboard/teacher");
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-50 rounded-md"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Course Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={course.title}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Enter course title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={course.description}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Course description"
        ></textarea>
      </div>

      <div>
        <label htmlFor="instrument" className="block text-sm font-medium">
          Instrument
        </label>
        <input
          type="text"
          name="instrument"
          id="instrument"
          value={course.instrument}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="e.g., Guitar, Piano, Violin"
        />
      </div>

      <div>
        <label htmlFor="teacherId" className="block text-sm font-medium">
          Teacher
        </label>
        <select
          name="teacherId"
          id="teacherId"
          value={course.teacherId}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium">
          Level
        </label>
        <input
          type="text"
          name="level"
          id="level"
          value={course.level}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Beginner, Intermediate, Advanced"
        />
      </div>

      <div>
        <label htmlFor="schedule" className="block text-sm font-medium">
          Schedule
        </label>
        <input
          type="text"
          name="schedule"
          id="schedule"
          value={course.schedule}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="e.g., Monday 10:00 AM - 12:00 PM"
        />
      </div>

      <div>
        <label htmlFor="capacity" className="block text-sm font-medium">
          Capacity
        </label>
        <input
          type="number"
          name="capacity"
          id="capacity"
          value={course.capacity}
          onChange={handleChange}
          required
          min={1}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="e.g., 20"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/teacher"
          className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Update Course
        </button>
      </div>
    </form>
  );
}
