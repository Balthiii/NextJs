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
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Suivi des élèves</h1>
      <div className="mb-4">
        <Link href="/dashboard/teacher/progress/create">
          <span className="bg-blue-500 text-white px-4 py-2 rounded">
            Évaluer un nouvel élève
          </span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {progressRecords.map((record) => (
          <div key={record.id} className="border p-4 rounded">
            <h3>Élève: {record.studentId}</h3>
            <p>Cours: {record.courseId}</p>
            <p>Évaluation: {record.evaluation}</p>
            <p>Commentaires: {record.comments}</p>
            <p>Date: {new Date(record.date).toLocaleDateString()}</p>
            <button
              onClick={() => handleEdit(record)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
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
