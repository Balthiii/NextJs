import { Suspense } from "react";
import SignupForm from "@/app/ui/signup-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Create an Account</h1>
        <p className="mt-3 text-2xl">Sign up to access your dashboard</p>
        <div className="mt-6 w-full max-w-md">
          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
