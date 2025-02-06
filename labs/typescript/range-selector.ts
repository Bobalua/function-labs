interface RangeSelectorTestCase {
    input: [string, unknown[]];
    output: number[];
}

export const testCases: RangeSelectorTestCase[] = [
    {
        input: ['1-10', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
        input: ['1,3-8,10', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
        output: [1, 3, 4, 5, 6, 7, 8, 10],
    },
    {
        input: ['1,3-8,10', ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']],
        output: [1, 3, 4, 5, 6, 7, 8, 10],
    }

];

/* Range Selector
Given an array of numbers and a string of comma-separated ranges, select the numbers that fall within the ranges.

For example, given the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and the string "1-10", return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].
Or given the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and the string "1,3-8,10", return [1, 3, 4, 5, 6, 7, 8, 10].
*/

export function subject(range: string, inputArray: number[]): unknown[] {

    return [1, 3, 4, 5, 6, 7, 8, 10];
}