"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProgress } from "@/app/lib/actions";
import { Progress } from "@/app/lib/definitions";

interface ProgressFormProps {
  initialData: Progress;
}

export default function ProgressForm({ initialData }: ProgressFormProps) {
  const [progress, setProgress] = useState<Progress>(initialData);
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      await updateProgress(progress.id, progress);
      router.push("/dashboard/teacher/progress");
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-50 rounded-md"
    >
      <div>
        <label htmlFor="evaluation" className="block text-sm font-medium">
          Évaluation
        </label>
        <input
          type="text"
          name="evaluation"
          id="evaluation"
          value={progress.evaluation}
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
          value={progress.comments}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="Enter comments"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Mettre à jour
      </button>
    </form>
  );
}
