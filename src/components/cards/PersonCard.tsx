import { Mail, Phone } from "lucide-react";

import type { Person } from "@/types/person.types";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#09111f]">
      <img
        src={person.photoUrl}
        alt={person.name}
        className="h-72 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">
          {person.name}
        </h3>

        <p className="mt-1 text-cyan-400">
          {person.designation}
        </p>

        <p className="mt-3 text-sm text-slate-400">
          {person.department}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-cyan-400" />
            {person.email}
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-cyan-400" />
            {person.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;