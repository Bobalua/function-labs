export const testCases = [
    {
        input: [[10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]],
        output: 300,
    },
    {
        input: [[9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1, 9]],
        output: 190,
    },
    {
        input: [[9, 1], [0, 0], [0, 0]],
        output: 10
    },
    {
        input: [[9, 1], [0, 0], [10]],
        output: 20
    },
    {
        input: [[5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5], [5, 5, 5]],
        output: 150,
    },
    {
        input: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        output: 0,
    },
    {
        input: [[10], [7, 3], [9, 0], [10], [0, 8], [8, 2], [0, 6], [10], [10], [10, 8, 1]],
        output: 167,
    }
];


/* Bowling Scorer
Return the total score of a bowling game based on the frames.
Each frame is an array of two numbers representing the number of pins knocked down in each roll.
The last frame can have three numbers if the player scored a strike or spare in the last frame.
*/
