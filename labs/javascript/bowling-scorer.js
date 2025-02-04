// 2025-01-18T00:53:38.442Z - 3 attempts - Success after 11 minutes
// 2025-01-18T00:41:37.573Z - 1 attempts - Success after 5 seconds
// 2025-01-18T00:40:07.160Z - 1 attempts - Success after 5 seconds
// 2025-01-18T00:37:36.984Z - 1 attempts - Success after 10 seconds
// 2025-01-18T00:37:14.562Z - 1 attempts - Success after 40 seconds
// 2025-01-18T00:36:25.904Z - 0 attempts - Failed after 13 seconds
// 2025-01-18T00:35:51.060Z - 32 attempts - Success after an hour
// 2025-01-17T23:06:00.842Z - 0 attempts - Failed after 43 seconds
// 2025-01-17T23:05:12.174Z - 2 attempts - Failed after a minute
// 2025-01-17T22:38:55.626Z - 1 attempts - Failed after 6 minutes
// 2025-01-17T22:31:54.239Z - 0 attempts - Failed after 17 seconds
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

export function subject(...frames) {
    let score = 0
    for (let i = 0; i < frames.length; i++) {
        const currentFrame = frames[i];
        const nextFrame = frames[i+1];
        const nextNextFrame = frames[i+2];

        if (currentFrame[2] != undefined) {
            score += currentFrame[0] + currentFrame[1] + currentFrame[2];
        } else if (i == 8) {
            if (currentFrame[0] == 10) {
                score += 10 + nextFrame[0] + nextFrame[1];
            } else if (currentFrame[0] + currentFrame[1] == 10) {
                score += 10 + nextFrame[0];
            }
        } else if (currentFrame[2] != undefined) {
            score += currentFrame[0] + currentFrame[1] + currentFrame[2];
        } else if (nextFrame == undefined) {
            if (currentFrame[1] == undefined) {
                score += currentFrame[0];
            } else {
                score += currentFrame[0] + currentFrame[1];
            }
        } else if ((currentFrame[0]) == 10) {
            score += 10 + (nextFrame[0]);
            if ((nextFrame[0]) == 10) {
                score += (nextNextFrame[0]);
            } else {
                score += (nextFrame[1]);
            }
        } else if ((currentFrame[0]) + (currentFrame[1]) == 10) {
            console.log("spare!");
            score += 10 + nextFrame[0];
        } else {
            console.log("open frame");
            score += currentFrame[0] + currentFrame[1];
        }
    }
    return score;
} 