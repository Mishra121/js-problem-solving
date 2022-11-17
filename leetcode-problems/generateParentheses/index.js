// 22. Generate Parentheses
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

// open < n, close < open , open = close = n, curr_str == n * 2

let res = [];
let N = 0;

const generateParenthesis = (n) => {
    res = [];
    N = n;
    backtrack(0, 0, '');
    return res;
}

const backtrack = (open, close, str) => {
    if(str.length === 2 * N) {
        res.push(str);
        return;
    }

    if(open < N) backtrack(open + 1, close, str + '(');
    if(close < open) backtrack(open, close + 1, str + ')');
};

console.log(generateParenthesis(3));
