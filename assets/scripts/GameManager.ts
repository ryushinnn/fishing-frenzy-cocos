import { _decorator, CCFloat, Component, Node } from 'cc';
import { Boat } from './Boat';
import { Spawner } from './Spawner';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Boat)
    public boat:Boat;

    @property(Spawner)
    public spawner:Spawner;

    @property(Node)
    public caughtFish:Node;

    @property(Node)
    public cursor:Node;

    @property(CCFloat)
    public spawnIntervalMin:number;

    @property(CCFloat)
    public spawnIntervalMax:number;

    private static instance:GameManager;

    private spawnCooldown:number = 0;

    onLoad(){
        GameManager.instance = this;
    }
    
    start() {
        this.cursor.active = false;
    }

    update(deltaTime: number) {
        this.trySpawn(deltaTime);
    }

    public static getInstance():GameManager{
        return GameManager.instance;
    }

    trySpawn(deltaTime:number){
        this.spawnCooldown -= deltaTime; 

        if (this.spawnCooldown <= 0){
            this.spawn();
            this.spawnCooldown = this.random(this.spawnIntervalMin, this.spawnIntervalMax);
        }
    }

    spawn(){
        this.spawner.spawn();
    }

    random(min:number, max:number):number{
        return Math.random() * (max - min + 1) + min;
    }
}


