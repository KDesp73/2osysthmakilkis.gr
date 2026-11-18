import Banner from "@/components/local/Banner";

export default function Departments() {
  const departments = [
    {
      name: "Αγέλη",
      ages: "6 - 10 ετών",
      schedule: "Σάββατο 13:00 - 14:30",
      staff: [
        "Αρχηγός Αγέλης: Βασιλική Ζώγκα",
        "Υπαρχηγοί: Αλέξανδρος Ιορδανίδης, Θανάσης Αμοιρίδης, Γεωργία Απατσίδου, Ζαχαρίας Τσιρώνης"
      ],
    },
    {
      name: "Ομάδα",
      ages: "11 - 14 ετών",
      schedule: "Σάββατο 16:00 - 18:00",
      staff: [
        "Αρχηγός Ομάδας: Ευάγγελος Γκρεκός",
        "Υπαρχηγοί: Ηλίας Σουμελίδης, Ηλίας Τσιρώνης",
      ],
    },
    {
      name: "Κοινότητα",
      ages: "15 - 18 ετών",
      schedule: "Κατόπιν συνεννόησης",
      staff: [
        "Αρχηγός Κοινότητας: Χρήστος Ιορδανίδης",
        "Υπαρχηγοί: Νεφέλη Βεργίδου, Γιώργος Γκρεκός",
      ],
    },
    {
      name: "Δίκτυο",
      ages: "18 - 25 ετών",
      schedule: "Κατόπιν συνεννόησης",
      staff: ["Αρχηγός Δικτύου: Θεόδωρος Παπαδόπουλος"],
    },
  ];

  const systemLeaders = {
    chief: "Αρχηγός Συστήματος: Στάθης Ιορδανίδης",
    deputies: ["Υπαρχηγοί Συστήματος: Άρτεμις Παχιαδάκη, Καλλιόπη Γεωργιάδου, Χρήστος Μωυσίδης"],
  };

  return (
    <div className="space-y-10">
      <Banner title="Τα τμήματά μας" />

      <div className="grid gap-6 md:grid-cols-2">
        {departments.map((dep) => (
          <article
            key={dep.name}
            className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">{dep.name}</h2>
            <dl className="space-y-2 text-sm md:text-base">
              <div>
                <dt className="font-medium text-muted-foreground">Ηλικίες</dt>
                <dd>{dep.ages}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Συγκεντρώσεις</dt>
                <dd>{dep.schedule}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Επιτελείο</dt>
                <dd>
                  <ul className="mt-1 list-disc list-inside space-y-0.5">
                    {dep.staff.map((member, idx) => (
                      <li key={idx}>{member}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border bg-muted/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 md:text-2xl">
          Αρχηγός & Υπαρχηγοί Συστήματος
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>{systemLeaders.chief}</li>
          <li>{systemLeaders.deputies.join(", ")}</li>
        </ul>
      </section>
    </div>
  );
}
