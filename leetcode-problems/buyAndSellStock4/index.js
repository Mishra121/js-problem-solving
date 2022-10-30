// 188. Best Time to Buy and Sell Stock IV

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
// Find the maximum profit you can achieve. You may complete at most k transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Input: k = 2, prices = [3,2,6,5,0,3]
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

// O(k.n2) complexity
var maxProfit = function(k, prices) {
    let n = prices.length;
    var profit = Array(k+1).fill(0).map(x => Array(n+1).fill(0));


    for (i = 0; i <= k; i++)
        profit[i][0] = 0;

     for (j = 0; j <= n; j++)
        profit[0][j] = 0;


    for (i = 1; i <= k; i++)
    {
        for (j = 1; j < n; j++)
        {
            var max_so_far = 0;

            for (m = 0; m < j; m++) {
                max_so_far = Math.max(max_so_far, prices[j] - prices[m] + profit[i - 1][m]);
            }

            profit[i][j] = Math.max(profit[i] [j - 1], max_so_far);
        }
    }

    return profit[k][n - 1];
};


// O(kn) and space complexity is O(nk)
var maxProfitBuyAndSell = function(k, prices) {
    let n = prices.length;

    let profit = Array(k+1).fill(0).map(x => Array(n+1).fill(0));

    for(let i =0; i<=k; i++) {
        profit[i][0] = 0;
    }

    for (let j = 0; j <= n; j++)
        profit[0][j] = 0;

    for (let i = 1; i <= k; i++)
    {
        var prevDiff = -Number.MAX_VALUE;
        for (let j = 1; j < n; j++)
        {
            // var max_so_far = 0;
            // for (m = 0; m < j; m++) {
            //     max_so_far = Math.max(max_so_far, prices[j] - prices[m] + profit[i - 1][m]);
            // }
            // profit[i][j] = Math.max(profit[i] [j - 1], max_so_far);

            prevDiff = Math.max(prevDiff, profit[i - 1][j - 1] - prices[j - 1]);
            profit[i][j] = Math.max(profit[i][j - 1], prices[j] + prevDiff);
        }
    }

    return profit[k][n - 1];
}


console.log(maxProfitBuyAndSell(2, [3,2,6,5,0,3]));
