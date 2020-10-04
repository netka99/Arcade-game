const assert = require('assert');

function checkCollision(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        (ax < bx && bx < (ax + aw) && ay < by && by < (ay + ah)) || (ax < bx && bx < (ax + aw) && ay < (by + bh) && (by + bh) < (ay + ah))
    )
    
}

assert(checkCollision(0, 0, 4, 4, 2, 2, 6, 4));
assert(checkCollision(1, 3, 4, 4, 4, 0, 4, 4));
assert(false === checkCollision(1, 3, 4, 4, 10, 14, 4, 4));

