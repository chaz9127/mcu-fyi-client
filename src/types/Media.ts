export type Media = {
  _id: string,
  name: string,
  slug?: string, // should not be optional
  poster: string,
  phase: number,
  releaseDate: number,
  description: string,
  playLink: string,
  trailerLink: string,
  relatedMedia: string[],
  duration?: number,
  type: string,
  season?: string,
}