/**
 * Role
 */
class Role extends Laya.Sprite {
    //if animation is cached
    private static cached: boolean = false;
    //define body of airflight
    private body: Laya.Animation;
    //define type of airflight
    private type: string;
    //0:hero,1:enimy
    public camp: number;
    //hitpoints
    public hp: number;
    //speed
    public speed: number;
    //attack radius
    public hitRadius: number = 0;
    //shoot type
    public shootType: number = 0;
    //shoot interval
    public shootInterval: number = 500;
    //next shoot time
    public shootTime: number = Laya.Browser.now() + 2000;
    //current action
    public action: string;
    //if it is bullet
    public isBullet: boolean = false;

    constructor() {
        super();
    }

    public init(type: string, camp: number, hp: number, speed: number, hitRadius: number): void {
        //initialize character's attribute
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;

        //cache shared animation templates
        if(!Role.cached){
            Role.cached = true;
            //hero fly
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            //hero down
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png", "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            //enemy1 fly
            Laya.Animation.createFrames(['war/enemy1_fly1.png'],'enemy1_fly');
            //enemy1 down
            Laya.Animation.createFrames(['war/enemy1_down1.png','war/enemy1_down2.png','war/enemy1_down3.png','war/enemy1_down4.png'],'enemy1_down');
            //enemy2 fly
            Laya.Animation.createFrames(['war/enemy2_fly1.png'],'enemy2_fly');
            //enemy2 down
            Laya.Animation.createFrames(['war/enemy2_down1.png','war/enemy2_down2.png','war/enemy2_down3.png','war/enemy2_down4.png'],'enemy2_down');
            //enemy2 hit
            Laya.Animation.createFrames(['war/enemy2_hit.png'],'enemy2_hit');
            //enemy3 fly
            Laya.Animation.createFrames(['war/enemy3_fly1.png','war/enemy3_fly2.png'],'enemy3_fly');
            //enemy3 down
            Laya.Animation.createFrames(['war/enemy3_down1.png','war/enemy3_down2.png','war/enemy3_down3.png','war/enemy3_down4.png','war/enemy3_down5.png','war/enemy3_down6.png'],'enemy3_down');
            //enemy3 hit
            Laya.Animation.createFrames(['war/enemy3_hit.png'],'enemy3_hit');
            //bullet
            Laya.Animation.createFrames(['war/bullet1.png'],'bullet1_fly');
        }
        if(!this.body){
            //create animation as a body
            this.body = new Laya.Animation();
            //set animation interval
            this.body.interval = 50;
            //add body to the container
            this.addChild(this.body);

            //add complete callback
            this.body.on('complete',this,this.onPlayComplete);
        }

        //play fly animation
        this.playAction("fly");
    }
    onPlayComplete(): void{
        if(this.action === 'down'){
            this.body.stop();
            this.visible = false;
        }else if(this.action === 'hit'){
            this.playAction('fly');
        }
    }

    playAction(action: string): void {
        //record current action!
        this.action = action;
        //play action
        this.body.play(0, true, this.type + '_' + action);
        //get bounds of animation
        var bound: Laya.Rectangle = this.body.getBounds();
        //set body to center position 
        this.body.pos(-bound.width / 2, -bound.height / 2);
    }
}