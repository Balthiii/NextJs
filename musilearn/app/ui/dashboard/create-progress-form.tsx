"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProgress } from "@/app/lib/actions";
import { Progress } from "@/app/lib/definitions";

interface CreateProgressFormProps {
  students: { id: string; name: string }[];
  courses: { id: string; title: string }[];
}

export default function CreateProgressForm({
  students,
  courses,
}: CreateProgressFormProps) {
  const [progress, setProgress] = useState<Partial<Progress>>({});
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createProgress(progress);
      router.push("/dashboard/teacher/progress");
    } catch (error) {
      console.error("Failed to create progress:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-50 rounded-md"
    >
      <div>
        <label htmlFor="studentId" className="block text-sm font-medium">
          Élève
        </label>
        <select
          name="studentId"
          id="studentId"
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="">Sélectionner un élève</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="courseId" className="block text-sm font-medium">
          Cours
        </label>
        <select
          name="courseId"
          id="courseId"
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="">Sélectionner un cours</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="evaluation" className="block text-sm font-medium">
          Évaluation
        </label>
        <input
          type="text"
          name="evaluation"
          id="evaluation"
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Enter evaluation"
        />
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium">
          Commentaires
        </label>
        <textarea
          name="comments"
          id="comments"
          rows={3}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Enter comments"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Évaluer
      </button>
    </form>
  );
}
