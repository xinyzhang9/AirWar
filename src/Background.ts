// 程序入口
class Background extends Laya.Sprite{
    private bg1: Laya.Sprite;
    private bg2: Laya.Sprite;
             width = 480;
             height = 852;
    constructor()
    {   
        super();
        this.init();
        
    }
    init(): void{
        //create bg1
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage('res/background.png');
        this.addChild(this.bg1);
        //create bg2
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage('res/background.png');
        this.bg2.pos(0,-this.height);
        this.addChild(this.bg2);

        //create frame loop
        Laya.timer.frameLoop(1,this,this.onLoop)
    }
    onLoop(): void{
        this.y += 1;
        if(this.bg1.y + this.y >= this.height){
            this.bg1.y -= this.height * 2;
        }
        if(this.bg2.y + this.y >= this.height){
            this.bg2.y -= this.height * 2;
        }
    }
}