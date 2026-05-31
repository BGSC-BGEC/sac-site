import PersonCard from "@/components/cards/PersonCard";
import { mockPeople } from "@/mock/mockPeople";

const InchargesPage = () => {
  const incharges = mockPeople.filter(
    (person) => person.personRole === "INCHARGE"
  );

  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            SAC In-Charges
          </h1>

          <p className="mt-4 text-slate-400">
            Faculty members responsible for overseeing the
            Sports Activities Centre.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {incharges.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InchargesPage;