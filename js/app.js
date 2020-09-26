// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 200 * dt; 
    if (this.x  > ctx.canvas.width + 95 ) {
        this.x = -150 * Math.floor(Math.random() * 4) + 1;

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.hight = 75;
    this.width = 65;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    const horisontal = 101;
    const vertical = 83;

    if (direction === 'left' && this.x - horisontal >= 0) {
        this.x -= horisontal;
    } else if (direction === 'right' && this.x + horisontal < ctx.canvas.width) {
        this.x += horisontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 150) {
        this.y += vertical;
    } else if (direction === 'up' && this.y >= 0) {
        this.y -= vertical;
    }
};


const player = new Player(202, 400, 'images/char-boy.png');
const allEnemies = [new Enemy(-800, 65), new Enemy(-500, 145), new Enemy(-200, 230)];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
