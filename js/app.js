let score = 0;
let lblScore = document.getElementById('score');
let messageBugs = document.querySelector(".collisionMsg");
const buttonAgain = document.querySelector(".buttonAgain");


// Enemies our player must avoid


var Enemy = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 95;
    this.sprite = 'images/enemy-bug.png';
    this.checkCollision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += 200 * dt;
    if (this.x > ctx.canvas.width + 95) {
        this.x = -150 * Math.floor(Math.random() * 4) + 1;
    }

    if (checkCollision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        score = 0;
        lblScore.innerHTML = score;
        messageBugs.innerHTML = "You hit a bug ! Your score is reset to 0";
        setTimeout(function () {
            messageBugs.classList.add('hidden');
        }, 2000);
        messageBugs.classList.remove('hidden');
        if (player) {
            player.x = 202;
            player.y = 400;
        } else {
            this.collision = false;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
};
Player.prototype.winning = function () {
    if (this.y <= 0) {
        winMessage();
    }
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    const horisontal = 101;
    const vertical = 83;
    lblScore.innerHTML = score;


    if (direction === 'left' && this.x - horisontal >= 0) {
        this.x -= horisontal;
    } else if (direction === 'right' && this.x + horisontal < ctx.canvas.width) {
        this.x += horisontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 150) {
        this.y += vertical;
        score -= 1;
        lblScore.innerHTML = score;
    } else if (direction === 'up' && this.y >= 0) {
        this.y -= vertical;
        score += 2;
        lblScore.innerHTML = score;
    }
    this.winning();
};


const player = new Player(202, 400, 'images/char-boy.png');
const allEnemies = [new Enemy(-800, 65), new Enemy(-400, 65),  new Enemy(-200, 145), new Enemy(-100, 230), new Enemy(-600, 230)];



document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function winMessage() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.querySelector(".score1").innerHTML = score;
};



function restart() {
    player.x = 202;
    player.y = 400;
    score = 0;
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
};
buttonAgain.addEventListener("click", restart);

function checkCollision(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ((ax - 70) < bx && bx < ((ax - 70) + (aw + 30)) && ay < by && by < (ay + ah)) || ((ax - 70) < bx && bx < ((ax - 70) + (aw + 50)) && ay < (by + bh) && (by + bh) < (ay + ah))
    )

}