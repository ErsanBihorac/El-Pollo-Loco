class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coins = 0;
    salsabottles = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * this functions creates gravity for movable objects
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * this function checks if the object is above the ground
     * @returns - returns either if it's above the ground, or if it's a throwable object
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; //throwableobject should always falls
        } else {
            return this.y < 120;
        }
    }

    /**
     * this functions checks the collision
     * @param {class} mo - mo stands for movable object for which collision is being checked
     * @returns - returns the hit box
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * this function decreases the energy (health of the movable object), it's mostly used for the character class
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function checks if the movable objects has already been hurt in the past second
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 1;
    }

    /**
     * this function sets the energy of the movable object to 0
     * @returns - sets the energy to 0
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * this functions is used to movable objects to move right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * this function is used for movable objects to move left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * this function makes the movable object jump, it's mostly used for the character class
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * this function iterates through the images in the array and creates an animation
     * @param {Array} images - is an array with the images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}