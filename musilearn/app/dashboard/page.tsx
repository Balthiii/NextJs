import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Tableau de Bord</h1>
      <p className="text-lg text-gray-600 mb-6">
        Bienvenue sur votre espace MusiLearn.
      </p>
      <Image
        src="/musilearn.jpg" // Chemin correct pour l'image dans le dossier public
        alt="Welcome"
        width={500}
        height={300}
        className="rounded shadow-lg mb-6"
      />
      <div className="flex space-x-4">
        <Link href="/dashboard/teacher">
          <span className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors">
            Espace Enseignant
          </span>
        </Link>
        <Link href="/dashboard/student/courses">
          <span className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors">
            Espace Étudiant
          </span>
        </Link>
      </div>
    </main>
  );
}
