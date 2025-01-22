// 2025-01-22T07:50:51.987Z - 1 attempts - Success after 5 seconds
// 2025-01-22T07:49:10.327Z - 2 attempts - Success after 5 minutes
// 2025-01-22T07:42:21.039Z - 3 attempts - Success after 5 minutes
// 2025-01-22T07:36:27.629Z - 1 attempts - Success after 3 minutes
// 2025-01-22T07:32:37.781Z - 8 attempts - Success after 31 minutes
// 2025-01-22T06:55:40.764Z - 3 attempts - Success after 6 minutes
// 2025-01-22T06:47:47.935Z - 4 attempts - Success after 7 minutes
// 2025-01-22T06:36:49.627Z - 3 attempts - Success after a minute
// 2025-01-22T06:34:36.599Z - 15 attempts - Success after an hour
export const testCases = [
    {
        input: [[10], [10]],
        output: 300,
    },
    {   input: [[10], [7]],
        output: 280,
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
        output: 150,
    },
    {
        input: [[10, 0], [7, 3], [9, 0], [10, 0], [0, 8], [8, 2], [0, 6], [10, 0], [10, 0]],
        output: 180,
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[9]], 
        output: 279,   
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10]], 
        output: 300,   
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10]], 
        output: 300,   
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[9, 1]], 
        output: 279,   
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[0, 0]], 
        output: 240, 
    },
    {
        input: [[10],[10],[10],[10],[10],[10],[10],[10],[10],[1, 2]], 
        output: 247, 
    }
];

/* Bowling Max Possible Scorer
Return the maximum possible score of a bowling game based on the frames that have been played.
*/

export function subject(...frames) {
    const maxArray = [];
    const lastFrame = frames[9];
    for (let i = 0; i < 9; i++) {
        const currentFrame = frames[i];
        maxArray[i] = currentFrame;
        if (currentFrame != undefined && currentFrame[1] != undefined) {
            // console.log(maxArray[2]); //debug
        } else if (currentFrame != undefined && currentFrame[1] == undefined) {
            maxArray[i].push(10 - currentFrame[0]);
        } else if (currentFrame == undefined) {
            maxArray[i] = [10, 0];
        }
    };
    if (lastFrame == undefined) {
        maxArray[9] = [10, 10, 10];
        console.log('holy hell');
    } else if (lastFrame != undefined && lastFrame[1] == undefined) {
        maxArray[9] = [lastFrame[0]];
        if (lastFrame[0] == 10) {
            maxArray[9].push(10);
        } else if (lastFrame[0] != 10) {
            maxArray[9].push(10 - lastFrame[0]);
        }
        maxArray[9].push(10);
    } else if (lastFrame[1] != undefined && lastFrame[2] == undefined && lastFrame[0] == 10 || lastFrame[0] + lastFrame[1] == 10) {
        maxArray[9] = [...lastFrame];
        maxArray[9].push(10);
    } else {
        maxArray[9] = [...lastFrame];
    }
    // console.log(maxArray); //debug
    let score = 0;
    for (let i = 0; i < maxArray.length; i++) {
        const currentFrame = maxArray[i];
        const nextFrame = maxArray[i+1];
        const nextNextFrame = maxArray[i+2];

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
};