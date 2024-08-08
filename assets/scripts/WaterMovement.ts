import { _decorator, Canvas, CCFloat, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WaterMovement')
export class WaterMovement extends Component {
    @property(CCFloat)
    public speed:number;
    
    private canvasHeight:number;
    private position:Vec3;
    
    start() {
        this.canvasHeight = director.getScene().
            getComponentInChildren(Canvas).
            getComponent(UITransform).height;
        this.position = this.node.position;
    }

    update(deltaTime: number) {
        this.position.y -= this.speed * deltaTime;
        if (this.position.y < 0 - this.canvasHeight){
            this.position = new Vec3(this.position.x, this.canvasHeight, this.position.z);
        }
        this.node.setPosition(this.position);
    }
}


