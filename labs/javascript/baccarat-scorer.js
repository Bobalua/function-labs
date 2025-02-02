// 2025-01-28T10:14:51.625Z - 2 attempts - Success after 2 minutes
// 2025-01-28T10:12:07.035Z - 4 attempts - Success after 6 minutes
export const testCases = [
    {
        input: [1, 2],
        output: 3,
    },
    {
        input: [10, 3],
        output: 3,
    },
    {
        input: [9, 9],
        output: 8,
    },
    {
        input: [5, 5, 5],
        output: 5,
    },
    {
        input: [0, 0],
        output: 0,
    },
    {
        input: ['K', 'Q'],
        output: 0,
    }
];

/* 
Baccarat Scorer
Return the total score of a baccarat hand based on the cards.
*/

export function subject(...hand) {
    // equating a scoring value for face cards and aces.
    const faceCardScore  = {
        'A': 1,
        'J': 10,
        'Q': 10,
        'K': 10
    };
    // will check if card is in faceCardScore, if it is, it will use that value for scoring
    // if not, it will use the numerical value of the card
    // the third value will do the same, however if it doesn't exist, it will default to a '0'
    let handScore = ((faceCardScore[hand[0]]) || hand[0]) +
                    ((faceCardScore[hand[1]]) || hand[1]) + 
                    ((faceCardScore[hand[2]]) || hand[2] || 0);  

    // console.log(handScore); // debug

    // if score is 10 or larger, the value will be converted to a string and the first character will be 'sliced', removing it.
    // it will then be parsed and re-converted into a usable value.
    if (handScore > 9) {
        handScore = JSON.parse(handScore.toString().slice(1));
        return handScore;
    // if score is less than 10, its value is already correct and can be returned.
    } else {
        return handScore;
    };
};
