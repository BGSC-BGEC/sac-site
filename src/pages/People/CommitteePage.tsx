import PersonCard from "@/components/cards/PersonCard";
import { mockPeople } from "@/mock/mockPeople";

const CommitteePage = () => {
  const committeeMembers = mockPeople.filter(
    (person) => person.personRole === "COMMITTEE"
  );

  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            SAC Committee
          </h1>

          <p className="mt-4 text-slate-400">
            Student committee members responsible for planning,
            organizing, and managing SAC activities and events.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {committeeMembers.map((person) => (
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

export default CommitteePage;