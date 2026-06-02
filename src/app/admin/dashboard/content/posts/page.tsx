"use client";

import PostEditor from "@/components/local/PostEditor";
import PostRemover from "@/components/local/PostRemover";
import PageHeader from "@/components/local/PageHeader";
import AdminPanel from "@/components/local/AdminPanel";

export default function DashboardPosts() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Άρθρα blog"
        description="Δημιουργήστε νέα άρθρα ή διαγράψτε υπάρχοντα."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <AdminPanel>
          <PostEditor />
        </AdminPanel>
        <AdminPanel className="xl:sticky xl:top-24 xl:self-start">
          <PostRemover />
        </AdminPanel>
      </div>
    </div>
  );
}
