"use client";

import FileManager from "@/components/local/cms/FileManager";
import PageHeader from "@/components/local/PageHeader";

export default function Files() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Αρχεία"
        description="Διαχείριση εγγράφων και metadata για τη σελίδα Χρήσιμα."
      />
      <FileManager />
    </div>
  );
}
