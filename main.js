// Alert Epilepsy users
if (confirm('Warning: Flickering Colors')) {
    console.log('Agreed');
} else {
    close();    
}

// Clickable headers
document.querySelector('#bouncyTrail').addEventListener('click', loopTrail);// Calls the trail animation
document.querySelector('#bouncyBall').addEventListener('click', loopBall);  // Calls the ball animation

// Grabs canvas tag
const canvas = document.querySelector('canvas');
// Drawing context on the canvas. Supports 2D and 3D.
const ctx = canvas.getContext('2d');
// Set width & height of the canvas to the viewport.
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// This function generates random whole numbers.
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function generates a random colors.
function randomColorGenerator() {
    return `rgb(${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)})`   
}

// Creates ball objects
class Ball {
    constructor(x, y, velocityX, velocityY, color, size) {
        // Setting up the properties of the ball object
        this.x = x;                 // starting position (horizontal)
        this.y = y;                 // starting position (vertical)
        this.velocityX = velocityX; // speed
        this.velocityY = velocityY; // speed
        this.color = color;         // color
        this.size = size;           // size     
    }

    // drawing the object
    draw () {
        ctx.beginPath();                                    // beginPath starts drawing shape
        ctx.fillStyle = this.color;                         // fillStyle paints shape
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // arc draws a circular arc
        ctx.fill();                                         // fill "pours paint" into the shape
    }

    // updating the object position
    update() {
        if (this.x + this.size >= width) {      // If object position exceeds the width of the right screen 
            this.velocityX = -(this.velocityX); // Then update object position away from the right screen
        }

        if (this.x - this.size <= 0) {          // If object position exceeds the width of the left screen
            this.velocityX = -(this.velocityX); // Then update object position away from the left screen
        }

        if (this.y + this.size >= height) {    // If object position exceeds the height of the bottom screen
            this.velocityY = -(this.velocityY); // Then update object position away from the bottom screen
        }

        if (this.y - this.size <= 0) {          // If object position exceeds the height of the top screen
            this.velocityY = -(this.velocityY); // Then update object position away from the top screen
        }

        this.x += this.velocityX;   // updates object position left to right
        this.y += this.velocityY;   // updates object posion vertically
    }

    // two objects interacting
    collisionDetect() {
        for (const ball of balls) { // balls is an array of many objects
            if (!(this === ball)) { // ball is an individual object
                const dx = this.x - ball.x; // the edge of two individual objects
                const dy = this.y - ball.y; // the edge of two individual objects
                const distance = Math.sqrt(dx * dx + dy * dy);  // circle collision algorithm

                if (distance < this.size + ball.size) {              // if two edges overlap
                    ball.color = this.color = randomColorGenerator();// then flicker colors
                }
            }
        }
    }
}

const balls = [];           // Will Store 50 objects 
while (balls.length <= 50) {// Generates 50 objects
    // Passes arguments into Ball constructor 50 times
    const size = randomNumberGenerator(5, 20)           // generates argument for this.size*
    const ball = new Ball(
        randomNumberGenerator(0 + size, width - size),  // argument for this.x 
        randomNumberGenerator(0 + size, height - size), // argument for this.y
        randomNumberGenerator(1, 4),                    // argument for this.velocityX
        randomNumberGenerator(1, 4),                    // argument for this.velocityY
        randomColorGenerator(),                         // argument for this.color
        size                                            // argument for this.size*
    )
    // Adds 50 objects into the array.
    balls.push(ball);
}

// Trail animation
function loopTrail() {
    // Draws on the canvas
    ctx.fillStyle = 'rgba(0,0,0,0.01)'; // Paints the canvas to semi-transparent black
    ctx.fillRect(0,0, width, height);   // Draws rectangle across the canvas

    // For each individual object in the array
    for (const ball of balls) {
        ball.draw()                     // Draw the object
        ball.update()                   // Update the object
        ball.collisionDetect()          // Determine if two objects overlap
    }
    // Repeatedly calls trail animation function (clickable header invokes first function call)
    requestAnimationFrame(loopTrail);   // Runs a function number of times per second to create a smooth animation
}

// Ball animation
function loopBall() {
    // Draws on the canvas
    ctx.fillStyle = 'rgba(0,0,0,0.3)';  // Paints the canvas to semi-transparent black
    ctx.fillRect(0,0, width, height);   // Draws rectangle across the canvas
    
    // For each individual object in the array
    for (const ball of balls) {
        ball.draw()                     // Draw the object
        ball.update()                   // Update the object
        ball.collisionDetect()          // Determine if two objects overlap
    }
    // Repeatedly calls ball animation function (clickable header invokes first function call)
    requestAnimationFrame(loopBall);   // Runs a function number of times per second to create a smooth animation
}