"use client";

import { useState, useEffect } from "react";
import { fetchStudentsProgress } from "@/app/lib/actions";
import { Progress } from "@/app/lib/definitions";
import ProgressForm from "@/app/ui/dashboard/progress-form";
import Link from "next/link";

export default function ProgressPage() {
  const [progressRecords, setProgressRecords] = useState<Progress[]>([]);
  const [selectedProgress, setSelectedProgress] = useState<Progress | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentsProgress();
        setProgressRecords(data);
      } catch (error) {
        console.error("Failed to fetch progress records:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (progress: Progress) => {
    setSelectedProgress(progress);
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-2xl md:text-3xl font-bold text-center">
        Suivi des élèves
      </h1>
      <div className="flex justify-center mb-6">
        <Link href="/dashboard/teacher/progress/create">
          <span className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-colors">
            Évaluer un nouvel élève
          </span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {progressRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white border p-4 rounded shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">
              Élève: {record.studentId}
            </h3>
            <p className="text-gray-600 mb-2">Cours: {record.courseId}</p>
            <p className="text-sm text-gray-500 mb-2">
              Évaluation: {record.evaluation}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Commentaires: {record.comments}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Date: {new Date(record.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleEdit(record)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Modifier
            </button>
          </div>
        ))}
      </div>
      {selectedProgress && (
        <div className="mt-8">
          <h2 className="text-lg font-medium">
            Modifier le progrès de l'élève
          </h2>
          <ProgressForm initialData={selectedProgress} />
        </div>
      )}
    </main>
  );
}
