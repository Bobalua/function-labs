interface RangeFinderTestCase {
    input: string;
    output: string;
}

export const testCases: RangeFinderTestCase[] = [
    {
        input: '1,2,3,4,5,6,7,8,9,10',
        output: '1-10',
    },
    {
        input: '1,3,4,5,6,7,8,10',
        output: '1,3-8,10',
    }
];


  /* Range Finder
  Given a string of comma separated numbers, find any sequences and replace them with a range.

  For example, given the string "1,2,3,4,5,6,7,8,9,10", return "1-10".
  Or given the string "1,3,4,5,6,7,8,10", return "1,3-8,10".
  */
  
  export function subject(series: string): string {
    return '';
  }