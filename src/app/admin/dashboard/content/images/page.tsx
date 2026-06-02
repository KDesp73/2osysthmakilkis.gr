"use client";

import ImageManager from "@/components/local/cms/ImageManager";
import PageHeader from "@/components/local/PageHeader";

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Εικόνες"
        description="Ανέβασμα και οργάνωση συλλογών φωτογραφιών."
      />
      <ImageManager />
    </div>
  );
}
