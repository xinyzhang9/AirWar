/**
* Game
*/
var Game = (function () {
    function Game() {
        //enemy hitpoints table
        this.hps = [1, 2, 10];
        //enemy speed table
        this.speeds = [3, 2, 1];
        //enemy radius table
        this.radius = [15, 30, 70];
        //initialize width and height
        Laya.init(480, 852);
        //create background
        var bg = new BackGround();
        //add background to stage
        Laya.stage.addChild(bg);
        //load image collections
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
        //display fps
        Laya.Stat.show();
    }
    Game.prototype.onLoaded = function () {
        //create a hero
        this.hero = new Role();
        //set hero position
        this.hero.init("hero", 0, 1, 0, 30);
        //set hero position
        this.hero.pos(240, 700);
        //add hero to stage
        Laya.stage.addChild(this.hero);
        //add listener to mouse
        Laya.stage.on('mousemove', this, this.onMouseMove);
        //create main loop
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Game.prototype.onMouseMove = function (e) {
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Game.prototype.onLoop = function () {
        //traverse all flights, update status
        for (var i = Laya.stage.numChildren - 1; i > -1; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                //update position by speed
                role.y += role.speed;
                //remove enemy if out of range
                if (role.y > 1000) {
                    //remove from stage
                    role.removeSelf();
                    //recycle to object pool
                    Laya.Pool.recover('role', role);
                }
            }
        }
        //create new enemy every 30 frames
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.createEnemy = function (num) {
        for (var i = 0; i < num; i++) {
            //random enemy
            var r = Math.random();
            var type = r < 0.7 ? 0 : r < 0.95 ? 1 : 2;
            //create enemy from object pool
            var enemy = Laya.Pool.getItemByClass('role', Role);
            //initialize role
            enemy.init('enemy' + (type + 1), 0, this.hps[type], this.speeds[type], this.radius[type]);
            //random position
            enemy.pos(Math.random() * 400 + 40, -Math.random() * 200 - 100);
            //add to stage
            Laya.stage.addChild(enemy);
        }
    };
    return Game;
}());
//start game
new Game();
//# sourceMappingURL=Game.js.map