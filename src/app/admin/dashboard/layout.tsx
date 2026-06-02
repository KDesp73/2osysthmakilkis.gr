import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import AdminDashboardLayout from "@/components/local/AdminDashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminDashboardLayout user={session}>{children}</AdminDashboardLayout>
  );
}
