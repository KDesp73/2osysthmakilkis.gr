"use client";

import ChangePasswordForm from "@/components/local/ChangePasswordForm";
import UserManager from "@/components/local/UserManager";
import PageHeader from "@/components/local/PageHeader";
import AdminPanel from "@/components/local/AdminPanel";
import { useAdminUser } from "@/contexts/AdminUserContext";

export default function DashboardSettings() {
  const user = useAdminUser();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ρυθμίσεις"
        description={
          user.role === "admin"
            ? "Διαχείριση χρηστών και λογαριασμού."
            : "Αλλαγή κωδικού πρόσβασης."
        }
      />
      <AdminPanel>
        {user.role === "admin" ? <UserManager /> : <ChangePasswordForm />}
      </AdminPanel>
    </div>
  );
}
