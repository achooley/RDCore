import {RoundPlayer} from "./RoundPlayer";
import {CellType} from "../cells/CellType";
import {IDice} from "../dice/IDice";
import {IRound} from "./IRound";
import {IRoundPlayer} from "./IRoundPlayer";
import {ICard} from "../Card";
import {IRoundObserver} from "./IRoundObserver";

export class SingleRound implements IRound {
    public readonly totalPlayers:number = 1;
    private player:IRoundPlayer;

    constructor(player:RoundPlayer) {
        this.player = player;
    }

    public get totalCards():number {
        return this.player.totalCards;
    }

    public getPlayer():IRoundPlayer {
        return this.player;
    }

    public getCard():ICard {
        return this.player.getCard();
    }

    public selectPlayer(index:number) {/**/}

    public get finished() {
        return this.player.finished;
    }

    public get throwsLeft(): number {return this.player.throwsLeft;}
    public get diceSize():number {return this.player.diceSize;}
    public getMixedDice():IDice {return this.player.getMixedDice();}

    public get throwed():IDice {return this.player.throwed;}
    public get holded():IDice {return this.player.holded;}

    public canHoldDie(index:number):boolean {return this.player.canHoldDie(index);}
    public canFreeDie(index:number):boolean {return this.player.canFreeDie(index);}

    public holdDie(index:number) {return this.player.holdDie(index);}
    public freeDie(index:number) {return this.player.freeDie(index);}

    public throwDice() {this.player.throwDice();}
    public setThrowedDice(dice:IDice) {this.player.setThrowedDice(dice);}
    public fillCell(type:CellType) {
        this.player.fillCell(type);
    }

    public selectCard(index:number) {this.player.selectCard(index);}
    public get activeCardIndex() {return this.player.activeCardIndex;}

    public get score() {return this.player.score;}

    public addObserver(observer:IRoundObserver) {
        this.player.addObserver(observer);
    }

    public removeObserver(observer:IRoundObserver) {
        this.player.removeObserver(observer);
    }
}
