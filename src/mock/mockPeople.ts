import type { Person } from "@/types/person.types";

export const mockPeople: Person[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    personRole: "INCHARGE",
    designation: "Faculty In-Charge",
    department: "Department of Mechanical Engineering",
    email: "rajesh.kumar@goa.bits-pilani.ac.in",
    phone: "+91 9876543210",
    photoUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },

  {
    id: 2,
    name: "Dr. Priya Sharma",
    personRole: "INCHARGE",
    designation: "Assistant Faculty In-Charge",
    department: "Department of Computer Science",
    email: "priya.sharma@goa.bits-pilani.ac.in",
    phone: "+91 9876543211",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },

  {
    id: 3,
    name: "Arjun Mehta",
    personRole: "COMMITTEE",
    designation: "Sports Secretary",
    department: "B.E. Computer Science",
    email: "f2023001@goa.bits-pilani.ac.in",
    phone: "+91 9876543212",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },

  {
    id: 4,
    name: "Ananya Verma",
    personRole: "COMMITTEE",
    designation: "Joint Sports Secretary",
    department: "B.E. Electronics",
    email: "f2023002@goa.bits-pilani.ac.in",
    phone: "+91 9876543213",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];