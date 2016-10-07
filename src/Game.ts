/**
* Game
*/
class Game {
    //hero
    private hero: Role
    //bullet offset table
    private bulletPos: Array<Array<number>> = [[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
    //level
    private level: number = 0;
    //score
    private score: number = 0;
    //levelUpScore
    private levelUpScore: number = 10;
    //bullet level
    private bulletLevel: number = 0;
    //enemy been hit radius
    private radius: Array<number> = [18,33,80];
    //role box
    private roleBox: Laya.Sprite;
    //game UI
    private gameInfo: GameInfo;

    private paused = false;

    constructor() {
        //initialize width and height
        Laya.init(480, 852, Laya.WebGL);
        //load image collections
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
        Laya.loader.load([{url:"res/sound/achievement.mp3",type:"sound"},
                            {url:"res/sound/bullet.mp3",type:"sound"},
                            {url:"res/sound/enemy1_down.mp3",type:"sound"},
                            {url:"res/sound/enemy2_down.mp3",type:"sound"},
                            {url:"res/sound/enemy3_down.mp3",type:"sound"},
                            {url:"res/sound/enemy3_out.mp3",type:"sound"},
                            {url:"res/sound/game_over.mp3",type:"sound"}]);

        //display fps
        // Laya.Stat.show(0,50);
    }

    onLoaded() {
        //create background
        var bg: BackGround = new BackGround();
        //add background to stage
        Laya.stage.addChild(bg);

        //role box
        this.roleBox = new Laya.Sprite();
        Laya.stage.addChild(this.roleBox);
        //game UI
        this.gameInfo = new GameInfo();
        Laya.stage.addChild(this.gameInfo);
        //create a hero
        this.hero = new Role();
        this.roleBox.addChild(this.hero);

        this.restart();
    }

    onMouseMove(e: Laya.Event):void{
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }
    onKeyDown(e): void{
        if(e.keyCode === 27){
            if(this.paused == false){
                this.paused = true;
                gameInstance.pause();
                this.gameInfo.infoLabel.text = 'Game paused.\nPress ESC to resume';
            }    
            else{
                this.paused = false;
                this.gameInfo.infoLabel.text = '';
                gameInstance.resume();
            }

        }
    }

    onLoop():void{
        //traverse all flights, update status
        for(var i: number = this.roleBox.numChildren-1; i>-1; i--){
            var role: Role = this.roleBox.getChildAt(i) as Role;
            if(role && role.speed){
                //update position by speed
                role.y += role.speed;
                //remove enemy if out of range
                if(role.y > 1000 || !role.visible || (role.heroType === 1 && role.y < -20)){
                    //remove from stage
                    role.removeSelf();
                    //reset attribute
                    role.visible = true;
                    //recycle to object pool
                    Laya.Pool.recover('role',role);
                }
            }
            //bullet logic
            if(role.shootType > 0){
                //get current time
                var time: number = Laya.Browser.now();
                //if current time > next Shoot time
                if(time > role.shootTime){
                    //update next shoot time
                    role.shootTime = time + role.shootInterval;
                    //set number and pos for different bullet type
                    var pos: Array<number> = this.bulletPos[role.shootType-1];
                    for(var index: number = 0; index < pos.length; index++){
                        //create bullet from object pool
                        var bullet: Role = Laya.Pool.getItemByClass('role',Role);
                        //initialize bullet
                        bullet.init('bullet1',role.camp,1,-4-role.shootType-Math.floor(this.level/15),1,1);
                        bullet.pos(role.x + pos[index],role.y - role.hitRadius - 10);
                        //add to stage
                        this.roleBox.addChild(bullet);
                    }
                    //bullet sound
                    Laya.SoundManager.playSound('res/sound/bullet.mp3');
                }
            }
        }
        //collision detect
        var n: number = this.roleBox.numChildren;
        for(var i: number = n-1; i > -1; i--){
            //get role 1
            var role1: Role = this.roleBox.getChildAt(i) as Role;
            //if role is dead
            if(role1.hp < 1) continue;
            for(var j: number = i-1; j > -1; j--){
                if(!role1.visible) continue;
                //get role 2
                var role2: Role = this.roleBox.getChildAt(j) as Role;
                //if role2 is alive and has different camp
                if(role2.hp > 0 && role1.camp != role2.camp){
                    //compute collision area
                    var hitRadius: number = role1.hitRadius + role2.hitRadius;
                    //see if it is a collision
                    if(Math.abs(role1.x-role2.x) < hitRadius && Math.abs(role1.y-role2.y) < hitRadius){
                        //lose hp
                        this.lostHp(role1,1);
                        this.lostHp(role2,1);
                        //increase score
                        this.score++;
                        //display UI
                        this.gameInfo.score(this.score);
                        //if score > levelUpScore, then level up
                        if(this.score > this.levelUpScore){
                            //level up
                            this.level++;
                            //display on UI
                            this.gameInfo.level(this.level);
                            //increase levelUpScore
                            this.levelUpScore += this.level * 5;
                        }
                    }
                }
            }
        }
        //if hero is dead, stop the game
        if(this.hero.hp < 1){
            //play sound
            Laya.SoundManager.playSound('res/sound/game_over.mp3');
            Laya.timer.clear(this,this.onLoop);
            //display info
            this.gameInfo.infoLabel.text = 'Gameover, your score is: '+this.score+'\nClick here to restart!';
            //add restart event listener
            this.gameInfo.infoLabel.once('click',this,this.restart);
        }
        //higher level, less interval to create enemy
        var cutTime: number = this.level < 30? this.level * 2 : 60;
        //higher level, higher speed of enemy
        var speedUp: number = Math.floor(this.level / 6);
        //higher level, higher hp of enemy
        var hpUp: number = Math.floor(this.level / 8);
        //higher level, more enemy
        var numUp: number = Math.floor(this.level / 10);

        //create new small enemy
        if(Laya.timer.currFrame % (80 - cutTime) === 0){
            this.createEnemy(0,2 + numUp,3 + speedUp, 1);
        }
        //create middle enemy
        if(Laya.timer.currFrame % (150 - cutTime * 2) === 0){
            this.createEnemy(1,1 + numUp,2 + speedUp,2 + hpUp * 2);
        }
        //create boss
        if(Laya.timer.currFrame % (900 - cutTime * 4) === 0){
            Laya.SoundManager.playSound("res/sound/enemy3_out.mp3");
            this.createEnemy(2,1,1 + speedUp, 10 + hpUp * 6);
        }        
    }

    restart(): void{
        //reset game data
        this.score = 0;
        this.level = 0;
        this.levelUpScore = 10;
        this.bulletLevel = 0;
        this.gameInfo.reset();

        //reset role
        this.hero.init('hero',0,5,0,30);
        //set hero position
        this.hero.pos(240,700);
        //set shoot type
        this.hero.shootType = 1;
        //reset shoot interval
        this.hero.shootInterval = 500;
        //show role
        this.hero.visible = true;

        for(var i: number = this.roleBox.numChildren - 1; i > -1; i--){
            var role: Role = this.roleBox.getChildAt(i) as Role;
            if(role != this.hero){
                role.removeSelf();
                //reset attribute before recycle
                role.visible = true;
                //recycle to object pool
                Laya.Pool.recover('role',role);

            }
        }
        this.resume();
    }
    public pause(): void{
        //stop main loop
        Laya.timer.clear(this, this.onLoop);
        //remove mouse listener
        Laya.stage.off('mousemove',this,this.onMouseMove);
    }
    public resume(): void{
        //create main loop
        Laya.timer.frameLoop(1,this, this.onLoop);
        //add mouse listener
        Laya.stage.on('mousemove', this, this.onMouseMove);
        Laya.stage.on(laya.events.Event.KEY_DOWN,this,this.onKeyDown);
    }
    lostHp(role: Role, lostHp: number): void{
        role.hp -= lostHp;
        if(role.heroType === 2){ //bulletLevel++
            //play sound
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
            this.bulletLevel++ ;
            this.hero.shootType = Math.min(Math.floor(this.bulletLevel/2)+1,4);
            this.hero.shootInterval = 500 - 20 * (this.bulletLevel > 20 ? 20: this.bulletLevel);

            //hide item
            role.visible = false;
        }else if(role.heroType === 3){ //hp++
            //play sound
            Laya.SoundManager.playSound('res/sound/achievement.mp3');
            this.hero.hp++;
            if(this.hero.hp > 10){
                this.hero.hp = 10;
            }
            //display hero hp
            this.gameInfo.hp(this.hero.hp);
            //hide item
            role.visible = false;
        }else if(role.hp > 0){
            role.playAction('hit');
        }else{ //if dead, play down animation
            //if isBullet, hide it
            if(role.heroType > 0){
                role.visible = false;
            }else{
                //play sound
                Laya.SoundManager.playSound('res/sound/'+role.type+'_down.mp3');
                role.playAction('down');          
                //beat boss to get hp++ or bullet++
                if(role.type == 'enemy3'){
                    var type: number = Math.random() < 0.7? 2: 3;
                    var item: Role = Laya.Pool.getItemByClass('role',Role);
                    //initialize item
                    item.init('ufo'+(type-1),role.camp,1,1,15,type);
                    //initialize pos
                    item.pos(role.x,role.y);
                    //add to stage
                    this.roleBox.addChild(item);
                }
            }
        }
        //display hero hp
        if(role == this.hero){
            this.gameInfo.hp(role.hp);
        }
    }


    createEnemy(type: number, num: number, speed: number, hp: number): void{
        for(var i: number = 0; i < num; i++){            
            //create enemy from object pool
            var enemy: Role = Laya.Pool.getItemByClass('role',Role);
            //initialize role
            enemy.init('enemy'+(type+1),1,hp,speed,this.radius[type]);
            //random position
            enemy.pos(Math.random()*400+40,-Math.random()*200-100);
            //add to stage
            this.roleBox.addChild(enemy);
        }
    }
}

//start game
var gameInstance: Game = new Game();