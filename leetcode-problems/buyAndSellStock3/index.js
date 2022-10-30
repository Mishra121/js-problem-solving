// 123. Best Time to Buy and Sell Stock III
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

var maxProfit = function(prices) {
    let n = prices.length;
    let profit = new Array(n).fill(0);

    let max_price = prices[n - 1];
    for(let i = n-2; i >=0; i--) {
        if(prices[i] > max_price) {
            max_price = prices[i];
        }

        profit[i] = Math.max(profit[i + 1], max_price - prices[i]);
    }


    let min_price = prices[0];
    for(let i = 1; i<n; i++) {
        if (prices[i] < min_price)
            min_price = prices[i];

        profit[i] = Math.max(profit[i-1], profit[i] + (prices[i] - min_price));
    }

    let result = profit[n - 1];
    return result;
};


console.log(maxProfit([3,3,5,0,0,3,1,4]))
