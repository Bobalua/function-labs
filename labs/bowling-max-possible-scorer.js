export const testCases = [
    {
        input: [[10, 0], [10, 0]],
        output: 300,
    },
    {
        input: [[9, 1], [9, 1], [9, 1], [9, 1], [9, 1]],
        output: 246,
        
    },
    {
        input: [[5, 5], [5, 5], [5, 5], [5, 5], [5, 5]],
        output: 230,
    },
    {
        input: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        output: 0,
    },
    {
        input: [[10, 0], [7, 3], [9, 0], [10, 0], [0, 8], [8, 2], [0, 6], [10, 0], [10, 0]],
        output: 180,
    }
];

/* Bowling Max Possible Scorer
Return the maximum possible score of a bowling game based on the frames that have been played.
*/

export function subject(...frames) {
    return 0;
};