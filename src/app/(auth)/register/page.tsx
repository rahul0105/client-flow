import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            C
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create your ClientFlow account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Start managing your clients, projects and business in one place.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}