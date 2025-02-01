const testCases = [
    {
        input: [[2,7,11,15], 9],
        output: [0,1], // 2 + 7 = 9
    },
    {
        input: [[3,2,4], 6],
        output: [1,2], // 2 + 4 = 6
    },
    {
        input: [[3,3], 6],
        output: [0,1], // 3 + 3 = 6
    },
]
// possible edges to add:
    //- a zero in the array
    //- correct indexes are nonconsecutive 
    

/*
    Sum Finder

    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        - You may assume that each input would have exactly one solution, and you may not use the same element twice.
        - Sort the array before returning the indices.

    Constraints:
        - Only one valid answer exists.

    Tip: It is often beneficial to brute force the solution first which we can _then_ optimize.
    Bonus: Can you solve it in less than O(n^2) time complexity?
*/

export function subject(nums, target) {
    // Your code here
    return [];
}

/*
- Going to start with the 'brute force' method, and revise upon completion
- nested for loops will check every other number in array against the target number.  
- possibly use pop() to remove the target value from array before iterating over it
    - move into a variable (let targetValue = input.flat().pop()) (? array name ?)
*/

// removing the target value from the end of input array 
// and putting it inside the 'targetValue' variable
let targetValue = inputs.pop();

// iterating over input array.  For every iteration, there is another loop
// that will also iterate through the same array (i and j are the respective indexes)
// if i and j are on the same index position, it will not compare and move to the next iteration
// every other iteration will check if the sum of the two current values is equivalent to the target value
// if false, it will move to the next iteration. If true, it will return an array with the correct indexes
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.lengh; j++) {
        if (i == j) {
            continue;
        } else if(i + j == targetValue) {
            return [i, j];
        };
    };
};  // I wrote this at work and didnt have time to test anything at all.  
    // I really wanted to get thoughts on paper. I am confident that the concept is 
    // sound, but am sure there is syntactical errors innumerable.  