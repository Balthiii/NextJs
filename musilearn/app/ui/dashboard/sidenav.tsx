import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex flex-col w-full h-full bg-gray-50 p-4 shadow-md">
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <span className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                Accueil
              </span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/teacher">
              <span className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                Liste des Cours
              </span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/teacher/progress">
              <span className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                Suivi des élèves
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-end mt-4">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white text-sm font-medium transition-colors hover:bg-red-400">
            <PowerIcon className="w-5" />
            <span>Déconnexion</span>
          </button>
        </form>
      </div>
    </div>
  );
}
