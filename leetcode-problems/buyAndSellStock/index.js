// 121. Best Time to Buy and Sell Stock
// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

var maxProfit = function (prices) {
    if(prices === null || prices.length <= 1) return 0;
    let minBuy = prices[0];
    let maxProfitSoFar = 0;

    for(let i = 1; i < prices.length; i++) {
        minBuy = Math.min(prices[i], minBuy);
        maxProfitSoFar = Math.max(maxProfitSoFar, prices[i] - minBuy);
    }

    return maxProfitSoFar;
}

console.log(maxProfit([7,1,5,3,6,4]));

module.exports = {
    maxProfit
}
