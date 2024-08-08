type Callback = (...args: any[]) => void;

export class EventDispatcher {
    private static events:Map<string, Callback[]> = new Map();

    public static AddListener(key:string, callback:Callback){
        if (!this.events.has(key)){
            this.events.set(key,[]);
        }

        this.events.get(key).push(callback);
    }

    public static RemoveListener(key:string, callback:Callback){
        let event = this.events.get(key);
        if (event){
            this.events.set(key, event.filter(cb => cb != callback));
        }
    }

    public static Raise(key:string, ...args: any[]){
        let event = this.events.get(key);
        if (event){
            event.forEach(cb => cb(args));
        }
    }
}

export class GameEvent{
    public static readonly ON_MONEY_UPDATED:string;
}


