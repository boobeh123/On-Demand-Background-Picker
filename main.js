/*
Canvas is a built-in API that allows 2D animations in browser

Set up the canvas
Get access to drawing properties and methods
*/

// Grabs canvas tag
const canvas = document.querySelector('canvas');
// Drawing context on the canvas. Supports 2D and 3D. "Tells computer to use the 2d library"
const ctx = canvas.getContext('2d');
// Set width & height of the canvas to the viewport .
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// This function generates random (whole) numbers.
// The numbers generated will control ball size, velocity, and inertia.
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function generates a random RGB color
// The numbers generated picks a RGB color between 0 and 255
function randomColorGenerator() {
    return `rgb(${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)})`   
}

// Creates ball objects
class Ball {
    // x & y are coordinates for ball starting position
    // velocityX & velocityY is the ball speed/angle 
    // color is the color of the ball object
    // size is the size of the ball object
    constructor(x, y, velocityX, velocityY, color, size) {
        // Setting up the properties of the ball object
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.size = size;
    }

    // Method that will draw the ball object
    draw () {
        // ctx accesses the Canvas commands. beginPath starts drawing shape
        ctx.beginPath();
        // The color generated will fill the ball object
        ctx.fillStyle = this.color;
        // Creates a circular arc. Ball starting positions is the center of the arc.
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill();
    }
    // Method that moves the ball & determines what happens if it reaches the edge of a screen.
    update() {
        // This if statement determines what happens when the ball reaches the right wall.
        // this.x is the center of the ball. this.size are the edges of the ball.
        // If center + edges is greater than the innerWidth of the screen...Then reverse the direction of the ball.
        if (this.x + this.size >= width) {
            // A positive * negative will result in negative. This reverses the direction.
            this.velocityX = -(this.velocityX);
        }

        // This if statement determines what happens when the ball reaches the left wall.
        if (this.x - this.size <= 0) {
            // A negative * negative will result in positive. This reverses the direction.
            this.velocityX = -(this.velocityX);
        }

        // This if statement determines what happens when the ball reaches the top wall.
        if (this.y + this.size >= height) {
            // A positive * negative will result in negative. This reverses the direction.
            this.velocityY = -(this.velocityY);
        }

        // This if statement determines what happens when the ball reaches the bottom wall.
        if (this.y - this.size <= 0) {
            // A negative * negative will result in positive. This reverses the direction.
            this.velocityY = -(this.velocityY);
        }

        // This moves the ball. Each time we re-draw the ball, draw the ball in a different location. 
        // Take the current location on the canvas and add the velocity to it.
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}
// Balls that will load on page load
const balls = [];
// A while loop that creates Ball objects (with random properties)
while (balls.length <= 10) {
    // Creates Ball objects with the Ball constructor
    const size = randomNumberGenerator(1, 20)
    const ball = new Ball(
        // x coordinate in Ball constructor parameter
        randomNumberGenerator(0 + size, width - size),  // Min = Left side of screen and buffer ball size && Max = Right side of the screen and buffer ball size
        // y coordinate in Ball constructor parameter
        randomNumberGenerator(0 + size, height - size), // Min = Bottom side of screen and buffer ball size && Max = Top side of the screen and buffer ball size
        // horizontal velocity in Ball constructor parameter
        randomNumberGenerator(1, 4),
        // vertical velocity in Ball constructor parameter
        randomNumberGenerator(1, 4),
        // color in Ball constructor parameter
        randomColorGenerator(),
        // size in Ball constructor parameter
        size
    )
    
    // Adds 10 ball objects into the array.
    balls.push(ball);
}

// A for loop that calls the draw method and the update method
// Draw draws the object. Update updates the position of the object.
function loopAnimations() {
    // For of loop to loop the draw & update method
    for (const ball of balls) {
        ball.draw()
        ball.update()
    }
    // Built-in function that draws a frame of animation
    // This (recursive) function calls the loopAnimations function
    requestAnimationFrame(loopAnimations);
}
// Calls the for loop on page load. The recursive function will keep calling after.
loopAnimations();