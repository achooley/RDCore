import {StateSlot} from "../../StateSlot";
import {AppEvent} from "../../AppEvent";
import {IDice} from "../../../model/coreGameplay/dice/IDice";

/** Описывает брошенные игроком кости */
export class AppEventSetThrowedDice extends AppEvent {
    public dice:IDice;

    constructor(dice:IDice) {
        super(StateSlot.RoundSetThrowedDice);
        this.dice = dice;
    }

    public toJSON(): any {
        const json = Object.assign({}, this);
        json.dice = this.dice.toJSON();
        return json;
    }
}
