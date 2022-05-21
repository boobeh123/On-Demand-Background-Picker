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
        /* Creates a circular arc. 
        Ball starting positions is the center of the arc. 
        Ball size, self explanatory.
        Arc starts at 0 degrees and ends at 2*Math.PI degrees.
        * Half circle =  start at 0 degrees & end at 3 degrees
        */
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill();
    }
}



// 2nd rng 
// function randomNumberGenerator2(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function randomColorGenerator2() {
//     return `rgb(${randomNumberGenerator2(0, 255)}, ${randomNumberGenerator2(0, 255)}, ${randomNumberGenerator2(0, 255)})`
// }
