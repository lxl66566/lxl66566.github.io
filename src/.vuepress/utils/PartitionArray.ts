/**
 * Partitions an array into two arrays based on a given predicate function.
 * Note that the processed two arrays are reversed in the process.
 *
 * @param {T[]} array - The array to be partitioned. This array will be consumed in the process.
 * @param {(item: T) => boolean} predicate - The function used to determine which array an item should be placed in.
 * @return {[T[], T[]]} An array of two arrays: the first array contains elements for which the predicate returns `true`, and the second array contains elements for which the predicate returns `false`.
 */
export function partitionInPlace<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const match: T[] = [];
  const nonMatch: T[] = [];
  while (array.length > 0) {
    const item = array.pop() as T;
    if (predicate(item)) {
      match.push(item);
    } else {
      nonMatch.push(item);
    }
  }
  return [match, nonMatch];
}
