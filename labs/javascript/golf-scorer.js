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
    {
        input: [ 1, Math.random() * 10 ],
        output: 'Hole-in-one!',
    },
    {
        input: [ 98, 100 ],
        output: 'Eagle',
    },
    {
        input: [ 99, 100 ],
        output: 'Birdie',
    },
    {
        input: [ 100, 100 ],
        output: 'Par',
    },
    {
        input: [ 101, 100 ],
        output: 'Bogey',
    },
    {
        input: [ 102, 100 ],
        output: 'Double Bogey',
    },
    {
        input: [ 103, 100 ],
        output: 'Go Home!',
    }
];

/* Golf Scorer
Return the result of a golf game based on the number of swings and the par.
1 swing is a "Hole-in-one!"
ect.
*/

export function subject(swings, par) {
    if (swings == 1) {
        return 'Hole-in-one!';
    }else if (swings - par == -2) {
        return 'Eagle';
    }else if (swings - par == -1) {
        return 'Birdie';
    }else if (swings == par) {
        return 'Par';
    }else if (swings - par == 1) {
        return 'Bogey';
    }else if (swings - par == 2) {
        return 'Double Bogey';
    }else if (swings - par >= 3) {
        return 'Go Home!'
    };
};