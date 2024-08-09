import { _decorator, CCInteger, Component, Node } from 'cc';
import { EventDispatcher, GameEvent } from './EventDispatcher';
const { ccclass, property } = _decorator;

@ccclass('Inventory')
export class Inventory extends Component {
    @property({
        type:CCInteger,
        readonly:true,
    })
    public curMoney:number = 0;

    private static instance:Inventory;

    onLoad(){
        Inventory.instance = this;
    }

    public static getInstance(){
        return Inventory.instance;
    }

    public receiveMoney(amount:number){
        this.curMoney += amount;
        console.log(this.curMoney);
        EventDispatcher.Raise(GameEvent.ON_MONEY_UPDATED, this.curMoney);
    }
}


