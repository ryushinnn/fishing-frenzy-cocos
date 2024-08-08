import { _decorator, Component, CurveRange, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Boat')
export class Boat extends Component {
    @property(Node)
    public bucket:Node;

    @property(Node)
    public caughFishContainer:Node;
    
    @property(Prefab)
    public fish:Prefab;

    start() {

    }

    update(deltaTime: number) {
        
    }

    public collectFish(pos:Vec3){
        let fish = instantiate(this.fish);
        fish.setParent(this.caughFishContainer);
        fish.setWorldPosition(pos);
        let dir = new Vec3(this.bucket.worldPosition.x - pos.x,
            this.bucket.worldPosition.y - pos.y,
            this.bucket.worldPosition.z - pos.z
        )
        let angle = Math.atan2(dir.y, dir.x) * 180 / Math.PI + 180;
        let vel = 1000;
        let dist = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        let time = dist/vel;
        fish.angle = angle; 

        tween(fish)
            .to(time, { worldPosition: this.bucket.worldPosition }, { easing: 'linear' })
            .call(()=>{
                fish.destroy();
            })
            .start();
    }
}


