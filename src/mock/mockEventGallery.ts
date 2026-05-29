export interface EventGalleryImage {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface EventGallery {
  eventSlug: string;
  images: EventGalleryImage[];
}

export const mockEventGallery: EventGallery[] = [
  {
    eventSlug: "interbits-football",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
        caption: "Opening Ceremony",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
        caption: "Group Stage Match",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1486286701208-1d58e9338013",
        caption: "Championship Final",
      },
    ],
  },

  {
    eventSlug: "fitness-challenge",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a",
        caption: "Opening Workout",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        caption: "Strength Competition",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
        caption: "Challenge Winners",
      },
    ],
  },

  {
    eventSlug: "swimming-championship",
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8",
        caption: "Race Start",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1519315901367-f34ff9154487",
        caption: "Final Heat",
      },
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1560090995-01632a28895b",
        caption: "Award Ceremony",
      },
    ],
  },
];