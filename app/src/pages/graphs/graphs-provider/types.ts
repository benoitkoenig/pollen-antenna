export interface SubdivisionData {
  id: string;
  coordinates?: [number, number][][] | undefined;
  answersByDate?:
    | {
        date: string;
        yesCount: number;
        noCount: number;
      }[]
    | undefined;
}
