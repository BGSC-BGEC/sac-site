export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface ActivityGallery {
  activitySlug: string;
  images: GalleryImage[];
}

export const mockGallery: ActivityGallery[] = [
  {
    activitySlug: "basketball",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc",
        caption: "Inter-BITS Basketball Finals",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1519861531473-9200262188bf",
        caption: "Practice Session",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
        caption: "Team Huddle",
      },
    ],
  },

  {
    activitySlug: "football",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
        caption: "Evening Football Training",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1486286701208-1d58e9338013",
        caption: "Inter-Hostel Match",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
        caption: "Championship Game",
      },
    ],
  },

  {
    activitySlug: "gym",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        caption: "Strength Training Session",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        caption: "Workout Area",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
        caption: "Fitness Challenge",
      },
    ],
  },

  {
    activitySlug: "swimming",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1519315901367-f34ff9154487",
        caption: "Swimming Practice",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8",
        caption: "Aquatics Meet",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1560090995-01632a28895b",
        caption: "Training Lanes",
      },
    ],
  },

  {
    activitySlug: "badminton",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
        caption: "Badminton Court",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1599058917212-d750089bc07f",
        caption: "Practice Match",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1613918431703-aa50854e44c6",
        caption: "Tournament Finals",
      },
    ],
  },
];