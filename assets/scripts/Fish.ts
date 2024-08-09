import { _decorator, CCInteger, Component, Node, RigidBody2D, Tween, tween, Vec3 } from 'cc';
import { MovableObject } from './MovableObject';
import { EventDispatcher } from './EventDispatcher';
import { Inventory } from './Inventory';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends MovableObject {
    @property(CCInteger)
    public value:number;

    @property(Node)
    public rotator:Node;
    
    private tween:Tween<Node> = null;
    private destroyed:boolean = false;
    
    start() {

    }

    lateUpdate(deltaTime: number) {
        if (this.destroyed){
            this.node.destroy();
        }
    }

    public setDestination(dest:Vec3){
        let dir = new Vec3(dest.x - this.node.position.x, 
            dest.y - this.node.position.y,
            dest.z - this.node.position.z);
        let angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI + 180;
        let dist = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        let vel = this.getVel();
        let time = dist / vel;
        this.rotator.angle = angle; 

        this.tween = tween(this.node)
            .to(time, { position: dest }, { easing: 'linear' })
            .call(this.onDisappear.bind(this))
            .start();
    }

    public onCaught() {
        this.tween.stop();
        this.onDisappear();
        Inventory.getInstance().receiveMoney(this.value);
    }
    protected onDisappear() {
        this.destroyed = true;
    }
}


