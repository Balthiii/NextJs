"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createCourse } from "@/app/lib/actions";
import { useActionState } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = { success: false, error: "" };

export default function CreateCourseForm({
  teachers,
}: {
  teachers: { id: string; name: string }[];
}) {
  const [state, formAction] = useActionState(
    (state: any, formData: FormData) => createCourse(state, formData),
    initialState
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard/teacher");
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      className="space-y-4 p-4 bg-gray-50 rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formAction(formData);
        setIsSubmitted(true);
      }}
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Course Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
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
        <Button type="submit">Create Course</Button>
      </div>

      {state.error && (
        <div className="text-red-500 text-sm">
          {Object.values(state.error).map((error, index) => (
            <p key={index}>{error as string}</p>
          ))}
        </div>
      )}
    </form>
  );
}
