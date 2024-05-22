export type Media = {
  _id: string,
  name: string,
  slug: string,
  poster: string,
  releaseDate: number,
  description: string,
  playLink: string,
  trailerLink: string,
  relatedMedia: string[],
  duration?: number,
  type: string,
  season?: string,
}