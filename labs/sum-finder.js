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
    - move into a variable (let targetValue = input.flat().pop(0)) (? array name ?)
*/