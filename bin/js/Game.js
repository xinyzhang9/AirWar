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
        this.radius = [18, 33, 80];
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
        this.hero.init("hero", 0, 5, 0, 30);
        //set hero position
        this.hero.pos(240, 700);
        //set shoot type
        this.hero.shootType = 1;
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
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                //update position by speed
                role.y += role.speed;
                //remove enemy if out of range
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    //remove from stage
                    role.removeSelf();
                    //reset attribute
                    role.isBullet = false;
                    role.visible = true;
                    //recycle to object pool
                    Laya.Pool.recover('role', role);
                }
            }
            //bullet logic
            if (role.shootType > 0) {
                //get current time
                var time = Laya.Browser.now();
                //if current time > next Shoot time
                if (time > role.shootTime) {
                    //update next shoot time
                    role.shootTime = time + role.shootInterval;
                    //create bullet from object pool
                    var bullet = Laya.Pool.getItemByClass('role', Role);
                    //initialize bullet
                    bullet.init('bullet1', role.camp, 1, -5, 1);
                    //set role type to bullet
                    bullet.isBullet = true;
                    //initialize bullet position
                    bullet.pos(role.x, role.y - role.hitRadius - 10);
                    //add to stage
                    Laya.stage.addChild(bullet);
                }
            }
        }
        //collision detect
        var n = Laya.stage.numChildren;
        for (var i = n - 1; i > 0; i--) {
            //get role 1
            var role1 = Laya.stage.getChildAt(i);
            //if role is dead
            if (role1.hp < 1)
                continue;
            for (var j = i - 1; j > 0; j--) {
                if (!role1.visible)
                    continue;
                //get role 2
                var role2 = Laya.stage.getChildAt(j);
                //if role2 is alive and has different camp
                if (role2.hp > 0 && role1.camp != role2.camp) {
                    //compute collision area
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //see if it is a collision
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //lose hp
                        this.lostHp(role1, 1);
                        this.lostHp(role2, 1);
                    }
                }
            }
        }
        //if hero is dead, stop the game
        if (this.hero.hp < 1) {
            Laya.timer.clear(this, this.onLoop);
        }
        //create new enemy every 30 frames
        if (Laya.timer.currFrame % 60 === 0) {
            this.createEnemy(2);
        }
    };
    Game.prototype.lostHp = function (role, lostHp) {
        role.hp -= lostHp;
        //if alive, play hit animation
        if (role.hp > 0) {
            role.playAction('hit');
        }
        else {
            //if isBullet, hide it
            if (role.isBullet) {
                role.visible = false;
            }
            else {
                role.playAction('down');
            }
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
            enemy.init('enemy' + (type + 1), 1, this.hps[type], this.speeds[type], this.radius[type]);
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