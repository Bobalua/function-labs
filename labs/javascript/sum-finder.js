// 2025-02-06T06:46:09.982Z - Attempt 1 - ✅ Success after 30 seconds
// 2025-02-06T06:44:45.080Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T06:43:48.698Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T06:42:36.791Z - Attempt 1 - ✅ Success after 5 seconds
// 2025-02-06T06:41:53.651Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T06:37:15.102Z - Attempt 1 - ✅ Success after 5 seconds
// 2025-02-06T06:36:23.720Z - Attempt 1 - ✅ Success after 10 seconds
// 2025-02-06T06:35:43.917Z - Attempt 1 - ✅ Success after 40 seconds
// 2025-02-06T06:34:26.288Z - Attempt 2 - ✅ Success after a minute
// 2025-02-06T06:24:30.598Z - Attempt 2 - ✅ Success after a minute
// 2025-02-06T06:21:14.478Z - Attempt 2 - ✅ Success after 30 seconds
// 2025-02-06T06:19:11.924Z - Attempt 13 - ✅ Success after 53 minutes
// 2025-02-06T06:19:10.908Z - Attempt 5 - ✅ Success after 8 minutes
// 2025-02-06T06:08:33.165Z - Attempt 1 - ❌ Failed after 45 seconds
export const testCases = [
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
    {
        input: [[1, 2, 3, 4, 5, 20], 25],
        output: [4, 5], // 3 + 3 = 6
    },
    {
        input: [[0, 1, 1, 1, 1, 1, 5], 6],
        output: [1, 6], // 3 + 3 = 6
    }
]
// possible edges to add:
    //- a zero in the array
    //- correct indexes are nonconsecutive 
    

/*
    Sum Finder

    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        - You may assume that each input would have exactly one solution, and you may not use the same element twice.
        

    Constraints:
        - Only one valid answer exists.

    Tip: It is often beneficial to brute force the solution first which we can _then_ optimize.
    Bonus: Can you solve it in less than O(n^2) time complexity?
*/

export function subject(nums, target) {
    let targetValue = target;
    nums = nums.flat();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == targetValue) {
                return [i, j];
            };
        };   
    };
};

/*
- Going to start with the 'brute force' method, and revise upon completion
- nested for loops will check every other number in array against the target number.  
- possibly use pop() to remove the target value from array before iterating over it
    - move into a variable (let targetValue = input.flat().pop()) (? array name ?)
*/

// removing the target value from the end of input array 
// and putting it inside the 'targetValue' variable

// iterating over input array.  For every iteration, there is another loop
// that will also iterate through the same array (i and j are the respective indexes)
// if i and j are on the same index position, it will not compare and move to the next iteration
// every other iteration will check if the sum of the two current values is equivalent to the target value
// if false, it will move to the next iteration. If true, it will return an array with the correct indexes
