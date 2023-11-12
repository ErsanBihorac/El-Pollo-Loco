class World {
    character = new Character();
    statusBar = new Statusbar();
    coinsBar = new Coinsbar();
    salsaBar = new Salsabar();
    bossBar = new Bossbar();

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    coins = this.level.coins;
    salsabottles = this.level.salsabottles;
    enemies = this.level.enemies;
    endboss = this.level.endboss;

    coin_sound = new Audio('audio/coin.mp3');
    bottle_smash = new Audio('audio/bottle_smash.mp3');
    bottle_pickup = new Audio('audio/bottle_pickup.mp3');
    boss_dead = new Audio('audio/boss_dead.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * this function makes the world available to the character and endboss object
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * this function repeats itself every couple miliseconds 
     */
    run() {
        setInterval(() => {
            this.checkCollisionsEndbossAndSalsa();
            this.checkCollisionsSalsa();
            this.checkCollisionsCoins();
            this.checkCollisionsEnemy();
            this.checkCollisionsEndboss();
        }, 50);

        setInterval(() => {
            this.checkThrowObjects();
        }, 175);
    }

    /**
     * this function mutes the sounds in the World
     */
    muteSounds() {
        this.coin_sound.muted = true;
        this.bottle_smash.muted = true;
        this.bottle_pickup.muted = true;
        this.boss_dead.muted = true;
        this.hurt_sound.muted = true;
    }

    /**
     * this function unmutes the sounds in the World
     */
    unmuteSounds() {
        this.coin_sound.muted = false;
        this.bottle_smash.muted = false;
        this.bottle_pickup.muted = false;
        this.boss_dead.muted = false;
        this.hurt_sound.muted = false;
    }

    /**
     * this function checks if D is being pressed and creates a new throwable object (a salsa bottle)
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.salsaBar.salsa >= 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaBar.setPercentage(-20);
        }
    }

    /**
     * this function checks if a throwable object is colliding with the endboss
     */
    checkCollisionsEndbossAndSalsa() {
        this.level.endboss.forEach((enemy) => {
            this.throwableObjects.forEach(bottle => {
                if (enemy.isColliding(bottle)) {
                    this.throwableObjects.pop();
                    this.bottle_smash.play();
                    this.bossBar.bosshealth -= 40;
                    this.bossBar.setPercentage(this.bossBar.bosshealth);
                }
                if (this.bossBar.bosshealth <= 0) {
                    this.kill(enemy);
                    this.boss_dead.play();
                }
            });
        });
    }

    checkCollisionsEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (!enemy.dead && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.hurt_sound.play();
            }
        }
        );
    }

    /**
     * this function checks if the character is colliding with an enemy and decreases the status bar of the character if it does collide
     */
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.dead && this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height > 60 && this.character.isAboveGround() && !this.character.isHurt() && enemy.jumpkillable) {
                    this.character.jump();
                    this.kill(enemy);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    this.hurt_sound.play();
                }
            }
        });
    }

    /**
     * this function checks if the character is colliding with a salsa bottle and increases the salsa bar
     */
    checkCollisionsSalsa() {
        this.level.salsabottles.forEach((salsabottles) => {
            if (this.character.isColliding(salsabottles)) {
                this.character.salsabottles += 20;
                this.salsaBar.setPercentage(20);
                this.level.salsabottles.splice(this.level.salsabottles.indexOf(salsabottles), 1);
                this.bottle_pickup.play();
            }
        });
    }

    /**
     * this function checks if the character is colliding with a coin and increases the coin bar if it does collide
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.character.coins += 20;
                this.coinsBar.setCoins(this.character.coins);
                this.level.coins.splice(this.level.coins.indexOf(coins), 1);
                this.coin_sound.play();
            }
        });
    }

    /**
     * this function draws all objects to the map 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.salsabottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);// back

        // ----------- Space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.salsaBar);
        this.addToMap(this.bossBar);

        this.ctx.translate(this.camera_x, 0);// forwards

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * this functions adds a movable objects to the map
     * @param {class} objects - the objects has to be a class
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * this function adds a movable object to the map, and flips the image if necessary
     * @param {class} mo - mo stands for movable object and has to be a class 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * this functions flips the image to 180 dagrees
     * @param {class} mo - mo stands for movable object 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * this function flips the image back to the starting point to 180 dagrees
     * @param {class} mo - mo stands for movable object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * this function kills the enemy and deletes it in the array
     * @param {class} enemy - any enemy that is a movable object
     */
    kill(enemy) {
        enemy.deadChicken();

        setTimeout(() => {
            this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }, 500);
    }
}