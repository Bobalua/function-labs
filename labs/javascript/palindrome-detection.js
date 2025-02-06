// 2025-02-06T07:36:58.855Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T07:35:10.617Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T07:34:00.467Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T07:33:32.554Z - Attempt 10 - ✅ Success after 6 minutes
export const testCases = [
    {
        input: 'racecar',
        output: true,
    },
    {
        input: 'hello',
        output: false,
    },
    {
        input: 'tacocat',
        output: true,
    },
    {
        input: 'taco cat',
        output: false,
    },
    {
        input: 'madam',
        output: true,
    },
    {
        input: 'maddam',
        output: true,
    }
];

/* A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward. */

export function subject(str) {
    for (let i = 0; i < Math.floor(str.length / 2); i++) {    
        if (str[i] != str[str.length - 1 - i]) {
            return false;
        }  
    }
    return true;
    
};

/*
- need to use modulo to deterimine if string has an even or odd amount of characters.
- need to determine the middle character(s) indexes
- loop over the string, checking corresponding indexes against each other.  
    - default boolean value will be set to true, so if the for loop completes and doesn't break due to a return,
        it will remain true and our output should be correct
    - if corresponding indexes are not equivalent, return false.
*/
    