import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MusiLearn - Accueil",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bienvenue sur MusiLearn
      </h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-blue-500 px-6 py-3 text-white text-sm font-medium transition-colors hover:bg-blue-400"
        >
          Connexion
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-green-500 px-6 py-3 text-white text-sm font-medium transition-colors hover:bg-green-400"
        >
          Inscription
        </Link>
      </div>
    </main>
  );
}
