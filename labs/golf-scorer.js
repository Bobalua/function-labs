export const testCases = [
    {
        input: [ 1, 4 ],
        output: 'Hole-in-one!',
    },
    {
        input: [ 2, 4 ],
        output: 'Eagle',
    },
    {
        input: [ 3, 4 ],
        output: 'Birdie',
    },
    {
        input: [ 4, 4 ],
        output: 'Par',
    },
    {
        input: [ 5, 4 ],
        output: 'Bogey',
    },
    {
        input: [ 6, 4 ],
        output: 'Double Bogey',
    },
    {
        input: [ 7, 4 ],
        output: 'Go Home!',
    },
];

/* Golf Scorer
Return the result of a golf game based on the number of swings and the par.
1 swing is a "Hole-in-one!"
ect.
*/

export function subject(swings, par) {
    return 'Par';
};

