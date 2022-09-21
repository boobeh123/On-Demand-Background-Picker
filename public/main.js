// Alert Epilepsy users
if (!localStorage.getItem('agreedOnce')) {
    if (confirm('READ -> WARNING: Flickering Colors')) {
        localStorage.setItem('agreedOnce', 1);
    } else {
        close();
    }
}

document.querySelector('#bouncyTrail').addEventListener('click', loopTrail);
document.querySelector('#bouncyBall').addEventListener('click', loopBall);
// document.querySelector('#bouncyPipe').addEventListener('click', loopPipe);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColorGenerator() {
    return `rgb(${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)})`   
}

class Ball {
    constructor(x, y, velocityX, velocityY, color, size) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velocityX = -(this.velocityX);
        }
        if (this.x - this.size <= 0) {
            this.velocityX = -(this.velocityX);
        }
        if (this.y + this.size >= height) {
            this.velocityY = -(this.velocityY);
        }
        if (this.y - this.size <= 0) {
            this.velocityY = -(this.velocityY);
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomColorGenerator();
                }
            }
        }
    }
}

const balls = [];
while (balls.length <= 25) {
    const size = randomNumberGenerator(5, 20);
    const ball = new Ball(
        randomNumberGenerator(0 + size, width - size),
        randomNumberGenerator(0 + size, height - size),
        randomNumberGenerator(1, 4),
        randomNumberGenerator(1, 4),
        randomColorGenerator(),
        size
    )
    balls.push(ball);
}

function loopTrail() {
    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(0,0, width, height);

    for (const ball of balls) {
        ball.draw()
        ball.update()
        ball.collisionDetect()
    }
    requestAnimationFrame(loopTrail);
}
function loopBall() {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0,0, width, height);
    
    for (const ball of balls) {
        ball.draw()
        ball.update()
        ball.collisionDetect()
    }
    requestAnimationFrame(loopBall);
}
// function loopPipe() {
//     for (const ball of balls) {
//         ball.draw()
//         ball.update()
//         ball.collisionDetect()
//     }
//     requestAnimationFrame(loopPipe);
// }