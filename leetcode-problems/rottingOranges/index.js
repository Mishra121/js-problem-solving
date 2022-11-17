// 994. Rotting Oranges

// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4

var orangesRotting = function(grid) {

    let queue = [], oranges = 0, time = 0;

    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[r].length; c++) {
            if(grid[r][c] === 1) oranges++;
            else if(grid[r][c] === 2) queue.push([r, c, 0]);
        }
    }

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const endR = grid.length - 1, endC = grid[0].length - 1;

    while (queue.length && oranges) {

        const [curR, curC, mins] = queue.shift();

        if(grid[curR][curC] === 1) {
            grid[curR][curC] = 2;
            oranges--;
            time = mins;
        }

        for(let [addR, addC] of dirs) {
            const [newR, newC] = [curR + addR, curC + addC];

            if(newR < 0 || newR > endR || newC < 0 || newC > endC) continue;

            if(grid[newR][newC] === 1) {
                queue.push([newR, newC, mins + 1]);
            }
        }
    }

    return oranges ? -1 : time;
};


console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]));

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));

