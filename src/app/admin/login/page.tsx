"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/local/PasswordField";
import SiteLogo from "@/components/local/SiteLogo";
import { login, type LoginState } from "@/actions/auth";
import { Shield } from "lucide-react";

const initialState: LoginState = { success: false };

export default function AdminLogin() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.success) {
      router.replace("/admin/dashboard");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground overflow-hidden">
        <Image
          src="/banner.jpg"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover opacity-25"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />

        <div className="relative z-10">
          <div className="inline-block rounded-lg bg-white px-3 py-2.5 shadow-md">
            <SiteLogo width={200} unoptimized priority />
          </div>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            Περιοχή διαχείρισης
          </h1>
          <p className="text-primary-foreground/85 text-lg leading-relaxed">
            Διαχειριστείτε άρθρα, εικόνες και αρχεία του συστήματος με ασφάλεια.
          </p>
        </div>

        <p className="relative z-10 text-sm text-primary-foreground/70">
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Επιστροφή στην ιστοσελίδα
          </Link>
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 bg-background">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="lg:hidden text-center space-y-4">
            <SiteLogo width={160} priority className="mx-auto" />
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Επιστροφή στην ιστοσελίδα
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Σύνδεση</h2>
            <p className="text-sm text-muted-foreground">
              Εισάγετε τα στοιχεία σας για πρόσβαση στο dashboard.
            </p>
          </div>

          {state.error && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Όνομα χρήστη</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Κωδικός</Label>
              <PasswordField
                id="password"
                name="password"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-primary hover:bg-primary/90"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Σύνδεση..." : "Σύνδεση"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
