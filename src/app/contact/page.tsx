"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageTitle from "@/components/local/PageTitle";
import ContactLinks from "@/components/local/ContactLinks";
import Map from "@/components/local/Map";
import { submitContact, type ContactState } from "@/actions/contact";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ContactState = { success: false };

export default function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <>
      <PageTitle
        title="Επικοινώνησε μαζί μας"
        subtitle="Στείλτε μήνυμα ή χρησιμοποιήστε τα στοιχεία επικοινωνίας παρακάτω."
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Στείλε ένα μήνυμα</h2>
          </div>

          <form action={formAction} className="space-y-5">
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <input type="hidden" name="_throttleId" value="contact" />

            <div className="space-y-2">
              <Label htmlFor="name">Όνομα</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Το όνομά σας"
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                maxLength={254}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Μήνυμα</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Γράψτε το μήνυμά σας εδώ..."
                required
                maxLength={5000}
                rows={5}
                className="resize-y min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? "Αποστολή..." : "Αποστολή μηνύματος"}
            </Button>
          </form>

          {state.success && (
            <div
              role="status"
              className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              Το μήνυμά σας στάλθηκε επιτυχώς!
            </div>
          )}
          {state.error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
              {state.error}
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-lg font-semibold mb-4">
              Άλλοι τρόποι επικοινωνίας
            </h2>
            <ContactLinks />
          </section>

          <section className="rounded-2xl border bg-card p-4 shadow-sm md:p-6 overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 px-2">Τοποθεσία</h2>
            <Map />
          </section>
        </div>
      </div>
    </>
  );
}
