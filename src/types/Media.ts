export type Media = {
  _id: string,
  name: string,
  poster: string,
  phase: number,
  releaseDate: number,
  description: string,
  playLink: string,
  trailerLink: string,
  relatedMedia: string[],
  duration?: number,
}