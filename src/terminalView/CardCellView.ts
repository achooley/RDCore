import {ATerminalView} from "./ATerminalView";
import chalk from "chalk";
import {ICardCell, IPlayableCardCell} from "../core/gameplay";

export class CardCellView extends ATerminalView {
    private cell: IPlayableCardCell;
    private key: string;

    public init(key: string, cell: IPlayableCardCell) {
        this.key = key;
        this.cell = cell;
    }

    public draw() {
        this.startDraw();

        let value = " - ";
        if (this.cell.isFull()) {
            value = this.cell.value().toString();
        }

        this.line(chalk.gray(`[${this.key}] `));
    }
}