// 2025-01-30T05:50:51.830Z - 15 attempts - Failed after 25 minutes
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

const faceCardScore = {
    'K': 10,
    'Q': 10,
    'J': 10,
    'A': 1
}


export function subject(...hand) {
    let handScore = ((faceCardScore[hand[0]]) || hand[0]) +
    ((faceCardScore[hand[1]]) || hand[1]) + 
    ((faceCardScore[hand[2]]) || hand[2] || 0);  

console.log(handScore); // debug


if (handScore > 9) {
handScore = JSON.parse(handScore.toString().slice(1));
return handScore;

} else {
return handScore;
};
    // let {card1, card2, card3} = hand;
    // function handScore(card1, card2, card3) {
    //     console.log(card1);
    //     console.log(card2);
    //     console.log(card3);
    //     return (faceCardScore[card1]) || card1 +
    //            (faceCardScore[card2]) || card2 +
    //            (faceCardScore[card3]) || card3;
    // };
    // let finalScore = handScore(...hand) % 10;
    // return finalScore;
};