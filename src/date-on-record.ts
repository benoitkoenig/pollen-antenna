/**
 * A {@link DateOnRecord} is a date as it appears in the graphdata. It has to be
 * in the form `AAAA-MM-DD`.
 * Note: {@link DateOnRecord} is simply equal to the type `string`. It does not
 * provide any stricter type checking, and its only use is to make the intent clear.
 */
export type DateOnRecord = string;

export function getDateOnRecord(date: Date) {
  return date.toISOString().split("T")[0] as DateOnRecord;
}

export function getDateOnRecordRange(from: DateOnRecord, to: DateOnRecord) {
  const iteratee = new Date(from);

  const datesOnRecordArray = [from];

  while (true) {
    iteratee.setDate(iteratee.getDate() + 1);

    const iterateeDateOnRecord = getDateOnRecord(iteratee);

    datesOnRecordArray.push(iterateeDateOnRecord);

    if (iterateeDateOnRecord === to) {
      break;
    }
  }

  return datesOnRecordArray;
}
