import FileCard from "@/components/local/FileCard";
import LinkCard from "@/components/local/LinkCard";
import PageHeader from "@/components/local/PageHeader";

interface ResourceItem {
  name: string;
  description: string;
  href: string;
}

export default function DashboardUseful() {
  const links: ResourceItem[] = [
    {
      name: "2η Αγέλη",
      description: "Google Drive",
      href: "https://drive.google.com/drive/u/2/folders/1iEOhUoxajRh0Ghv_Jz36p0jbs0Sv2Yw4",
    },
    {
      name: "2η Ομάδα",
      description: "Google Drive",
      href: "https://drive.google.com/drive/folders/1jvuLRoaTdhAizOuXmyaO1d8E728-OdqZ",
    },
    {
      name: "Ονομαστική Κατάσταση Συστήματος",
      description: "Google Sheets",
      href: "https://docs.google.com/spreadsheets/d/1NafMecUgSjX426n4YWxJXKmGbzJQnOcUj855VFdxnaE/edit?gid=0#gid=0",
    },
    {
      name: "Φωτογραφίες Συστήματος",
      description: "Google Drive",
      href: "https://drive.google.com/drive/u/3/folders/14dzXD8R6LLkII-g7N0l7CrNhe6_j_o_Y",
    },
    {
      name: "e-sep",
      description:
        "Σύστημα Διαχείρισης Ηλεκτρονικών Υπηρεσιών του Σώματος Ελλήνων Προσκόπων",
      href: "https://e-sep.eu/app/sso/web/",
    },
    {
      name: "Νέο Πρόγραμμα",
      description: "Drive με αρχεία για το νέο πρόγραμμα",
      href: "https://drive.google.com/drive/folders/167Wwxl-t-fZGH6EsIExfq0fT5t5pAUDU",
    },
  ];

  const files: ResourceItem[] = [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Χρήσιμοι σύνδεσμοι"
        description="Σύνδεσμοι προς εξωτερικούς πόρους για την ομάδα."
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Αρχεία</h2>
        {files.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <FileCard key={file.href} {...file} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground rounded-lg border border-dashed p-8 text-center">
            Δεν υπάρχουν διαθέσιμα αρχεία.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Σύνδεσμοι</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <LinkCard key={link.href} {...link} />
          ))}
        </div>
      </section>
    </div>
  );
}
