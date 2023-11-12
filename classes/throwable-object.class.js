class ThrowableObject extends MovableObject {
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(x, y);
        this.animate();
    }

    /**
     * this function creates the gravity and starting point for the throwable object
     * @param {*} x - is the starting point on x-axis of the character
     * @param {*} y - is the starting point on y-axis of the character
     */
    throw(x, y) {
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * this function animates the thrown salsa bottle
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWING);
        }, 75);
    }
}