class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1500;
        this.animate();
    }

    /**
     * this function animates the clouds to move left
     */
    animate() {
        this.moveLeft();
    }
}