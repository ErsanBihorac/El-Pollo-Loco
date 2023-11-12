class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * this function creates a new Image
     * @param {*} path -  path to the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * this function draws the image into the world
     * @param {*} ctx - is the world
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * this functions draws a frame around the objects, it's used as a tool for devs to check collision between objects
     * @param {*} ctx - ctx is the world
     */
    drawFrame(ctx) {
        if (this instanceof Coins || this instanceof Chicken || this instanceof SalsaBottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * this functions loads the image, so it can be displayed on the map afterwards.
     * @param {*} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}