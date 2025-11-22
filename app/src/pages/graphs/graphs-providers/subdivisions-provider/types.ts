export interface SubdivisionData {
  id: string;
  geoJson?: unknown;
  answersByDate?:
    | {
        date: string;
        yesCount: number;
        noCount: number;
      }[]
    | undefined;
}
