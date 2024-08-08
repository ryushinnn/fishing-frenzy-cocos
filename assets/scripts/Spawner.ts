import { _decorator, Canvas, Component, director, instantiate, math, Node, Prefab, random, UITransform, utils, Vec2, Vec3 } from 'cc';
import { Fish } from './Fish';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export class Spawner extends Component {
    @property(Prefab)
    public fish:Prefab

    private canvasHeight:number;
    private canvasWidth:number;
    
    start() {
        let canvasTf = director.getScene().
            getComponentInChildren(Canvas).
            getComponent(UITransform);
        this.canvasHeight = canvasTf.height;
        this.canvasWidth = canvasTf.width;
    }

    public spawn(){
        let spawnPosition:Vec3;
        let destination:Vec3;

        if (Math.random() > 0.5){
            let posX = this.random(0 - this.canvasWidth/2, this.canvasWidth/2);
            spawnPosition = new Vec3(posX, this.canvasHeight/2, 0);
            destination = new Vec3(posX, 0-this.canvasHeight/2, 0);
        }else{
            let posY = this.random(0-this.canvasHeight/2, this.canvasHeight/2);
            let offsetY = this.canvasWidth * Math.tan(30 * Math.PI / 180);
            spawnPosition = new Vec3(this.canvasWidth/2, posY, 0);
            destination = new Vec3(0 - this.canvasWidth/2, posY + offsetY, 0);
        }

        let newFish = instantiate(this.fish);
        newFish.setPosition(spawnPosition);
        newFish.setParent(this.node);
        newFish.getComponent(Fish).setDestination(destination)
    }

    random(min:number, max:number):number{
        return Math.random() * (max - min + 1) + min;
    }
}


