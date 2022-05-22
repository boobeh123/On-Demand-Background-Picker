/*
Canvas is a built-in API that allows 2D animations in browser

Set up the canvas
Get access to drawing properties and methods
*/

// Grabs canvas tag
const canvas = document.querySelector('canvas');
// Drawing context on the canvas. Supports 2D and 3D. "Tells computer to use the 2d library"
const ctx = canvas.getContext('2d');
// Set width & height on the canvas to the innerWidth of the window.
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// This function generates random (whole) numbers.
// The numbers generated will control ball size, velocity, and inertia.
function randomNumberGenerator() {
    return Math.floor(Math.random() * 255);
}

// This function generates a random RGB color
// The numbers generated picks a RGB color between 0 and 255
function randomColorGenerator() {
    return `rgb(${randomNumberGenerator}, ${randomNumberGenerator}, ${randomNumberGenerator})`
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



// 2nd rng 
// function randomNumberGenerator2(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function randomColorGenerator2() {
//     return `rgb(${randomNumberGenerator2(0, 255)}, ${randomNumberGenerator2(0, 255)}, ${randomNumberGenerator2(0, 255)})`
// }
