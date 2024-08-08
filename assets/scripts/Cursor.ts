import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, UITransform, Vec3 } from 'cc';
import { Input, EventMouse, input } from 'cc';
import { Fish } from './Fish';
import { Boat } from './Boat';
const { ccclass, property } = _decorator;

@ccclass('Cursor')
export class Cursor extends Component {    
    @property(Boat)
    public boat:Boat;
    
    onLoad(){
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onDestroy(){
        input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    start(){
        let col = this.getComponent(Collider2D);
        col.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    onMouseDown(_: EventMouse){
        this.node.active = true;
    }

    onMouseUp(_:EventMouse){
        this.node.active = false;
    }

    onMouseMove(event: EventMouse){
        let mousePos = event.getUILocation();
        let uiTf = this.node.parent!.getComponent(UITransform)!;
        let localPos = uiTf.convertToNodeSpaceAR(new Vec3(mousePos.x, mousePos.y, 0));
        this.node.setPosition(localPos);
    }

    onBeginContact(selfCol: Collider2D, otherCol: Collider2D, contact:IPhysics2DContact|null){
        let fish = otherCol.node.getComponent(Fish);
        if (fish){
            fish.onCaught();
            this.boat.collectFish(fish.node.worldPosition);
        }
    }
}


