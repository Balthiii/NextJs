import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function SideNav() {
  return (
    <div className="flex w-full items-center justify-end bg-gray-50 p-4 shadow-md">
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
  );
}
