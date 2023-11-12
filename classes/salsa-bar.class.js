class Salsabar extends DrawableObject {
    salsa = 0;

    SALSA_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.SALSA_IMAGES);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * this function sets the percentage for the salsa bar
     * @param {number} salsa - is the current percentage (salsa) of the character that's available
     */
    setPercentage(salsa) {
        this.salsa += salsa;
        let path = this.SALSA_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function selects the correct image that displays the salsa bar
     * @returns - the function returns the number of the location in the array for the correct image
     */
    resolveImageIndex() {
        if (this.salsa >= 100) {
            return 5;
        } else if (this.salsa == 80) {
            return 4;
        } else if (this.salsa == 60) {
            return 3;
        } else if (this.salsa == 40) {
            return 2;
        } else if (this.salsa == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}