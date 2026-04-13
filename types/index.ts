export type Media = {
  _id: string;
  name: string;
  slug: string;
  poster: string;
  releaseDate: number;
  chronologicalOrder: number;
  description: string;
  playLink: string;
  playLinkIcon?: string;
  trailerLink: string;
  relatedMedia: string[];
  duration: number;
  type: string;
  season?: number;
};

export type SearchResult = {
  _id: string;
  name: string;
  slug: string;
  season?: number;
};

export type AuthUser = {
  email: string;
  role: string;
  watched: string[];
};
