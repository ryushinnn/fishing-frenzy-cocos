import { _decorator, Canvas, Component, EventTouch, Node, renderer, Sprite, UITransform} from 'cc';
import { Vec2, Vec3, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

const v2_0 = new Vec2();
const v3_0 = new Vec3();
const v4_0 = new Vec4();

@ccclass('BoatTrail')
export class BoatTrail extends Component {
    @property
    waveDis = 0.4;

    @property
    waveSpeed = 1;

    @property
    waveStr = 0.5;

    @property(Node)
    center:Node;

    public waveProp: Vec4 = new Vec4();

    private _trans:UITransform;
    private _pass:renderer.Pass;
    private _handle:number;

    private _cd:number = 0;
    
    start() {
        this._trans = this.node.getComponent(UITransform);
        this.waveProp.w = 100;
        this.waveProp.z = this.waveStr;
        this._pass = this.node.getComponent(Sprite).material.passes[0];
        this._handle = this._pass.getHandle("waveFactor");
        this.startWave();
    }


    update(deltaTime: number) {
        if (this.waveProp.w < 100) {

            this.waveProp.w += deltaTime * this.waveSpeed;
            if (this.waveProp.w > this.waveDis) {
                this.waveProp.w = 0;
            }

            let tmp =this.waveProp;
            tmp.x = v4_0.x * (0.9 + Math.random() * 0.2);
            tmp.y = v4_0.y * (0.9 + Math.random() * 0.2);
            this.waveProp.set(tmp);
            this._pass.setUniform(this._handle, this.waveProp);
        }
    }

    startWave(){
        const wp = this.center.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0,0,0));
        const canvas = this.node.scene.getComponentInChildren(Canvas).node;
        const canvasTf = canvas.getComponent(UITransform);
        const canvasPos = canvasTf.convertToNodeSpaceAR(wp);
        const up = new Vec3(
            canvasPos.x + canvasTf.width / 2,
            canvasPos.y + canvasTf.height / 2,
            canvasPos.z
        );

        v2_0.set(up.x, up.y);
        console.log(v2_0);
        console.log(up);
        v3_0.set(v2_0.x, v2_0.y);

        this._trans.convertToNodeSpaceAR(v3_0, v3_0);


        const size = this._trans.contentSize;

        const x = size.x;

        const y = size.y;

        v4_0.x = (x * 0.5 + v3_0.x) / x;

        v4_0.y = 1 - (y * 0.5 + v3_0.y) / y;

        v4_0.w = 0;

        this.waveProp.set(v4_0);
    }
}


