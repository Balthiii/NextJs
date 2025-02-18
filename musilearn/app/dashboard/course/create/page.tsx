import { lusitana } from "@/app/ui/fonts";
import CreateCourseForm from "@/app/ui/dashboard/create-form";
import { getTeachers } from "@/app/lib/actions";
export default async function Page() {
  const teachers = await getTeachers();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Créer un Cours
      </h1>

      <div className="mt-4">
        <CreateCourseForm teachers={teachers || []} />
      </div>
    </main>
  );
}
