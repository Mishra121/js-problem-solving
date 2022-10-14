// 71. Simplify Path - using stack
// Input: path = "/home//foo/"
// Output: "/home/foo"

var simplifyPath = function(path) {
    let pathArr = path.split('/');
    let stack = [];

    for(let p of pathArr) {
        if(p == '.' || p == '') continue;
        else if(p == '..') stack.pop();
        else stack.push(p);
    }

    return '/' + stack.join('/');
};

module.exports = {
    simplifyPath
};