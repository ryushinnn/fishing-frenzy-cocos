import { _decorator, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovableObject')
export abstract class MovableObject extends Component {
    @property(CCFloat)
    public velMin:number;

    @property(CCFloat)
    public velMax:number;
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    public abstract setDestination(dest:Vec3);

    public abstract onCaught();

    protected abstract onDisappear();

    protected getVel():number{
        return this.random(this.velMin,this.velMax);
    }

    random(min:number, max:number):number{
        return Math.random() * (max - min + 1) + min;
    }
}


