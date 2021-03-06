import * as assert from "assert";
import "mocha";
import {DieType} from "../src/model/coreGameplay/dice/DieType";
import {IDie} from "../src/model/coreGameplay/dice/IDie";
import {Dice} from "../src/model/coreGameplay/dice/Dice";
import {IPlayableCell} from "../src/model/coreGameplay/cells/IPlayableCell";
import {CellType} from "../src/model/coreGameplay/cells/CellType";
import {NumberCell} from "../src/model/coreGameplay/cells/playable/NumberCell";
import {JokerDie} from "../src/model/coreGameplay/dice/JokerDie";
import {RoyalDiceCell} from "../src/model/coreGameplay/cells/playable/RoyalDiceCell";
import {Config} from "../src/model/Config";
import {ChanceCell} from "../src/model/coreGameplay/cells/playable/ChanceCell";
import {KindCell} from "../src/model/coreGameplay/cells/playable/KindCell";
import {FullHouseCell} from "../src/model/coreGameplay/cells/playable/FullHouseCell";
import {StraightCell} from "../src/model/coreGameplay/cells/playable/StraightCell";
import {Card, ICard} from "../src/model/coreGameplay/Card";
import {DefaultCardCellsFactory} from "../src/model/coreGameplay/round/cardCellFactories/DefaultCardCellsFactory";
import {TotalNumbersCell} from "../src/model/coreGameplay/cells/service/TotalNumbersCell";
import {IServiceCell} from "../src/model/coreGameplay/cells/IServiceCell";
import {Bonus63Cell} from "../src/model/coreGameplay/cells/service/Bonus63Cell";
import {TotalNumbersWithBonusCell} from "../src/model/coreGameplay/cells/service/TotalNumbersWithBonusCell";
import {TopPointsCell} from "../src/model/coreGameplay/cells/service/TopPointsCell";
import {BottomPointsCell} from "../src/model/coreGameplay/cells/service/BottomPointsCell";
import {BonusRoyalCell} from "../src/model/coreGameplay/cells/service/BonusRoyalCell";
import {TotalBonusesCell} from "../src/model/coreGameplay/cells/service/TotalBonusesCell";
import {FinalScoreCell} from "../src/model/coreGameplay/cells/service/FinalScoreCell";
import {MultiplierCellDecorator} from "../src/model/coreGameplay/cells/decorators/MultiplierCellDecorator";

describe("Cells", () => {
    const die1: IDie = {type: DieType.Value, value: 1};
    const die2: IDie = {type: DieType.Value, value: 2};
    const die3: IDie = {type: DieType.Value, value: 3};
    const die4: IDie = {type: DieType.Value, value: 4};
    const die5: IDie = {type: DieType.Value, value: 5};
    const die6: IDie = {type: DieType.Value, value: 6};

    describe("Playable cells", () => {
        describe("NumberCell", () => {
            it("NumberCell", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new NumberCell(CellType.Ones, 1);
                cell.fill(dice);
                assert.equal(cell.value, 1);
            });

            it("NumberCellJocker", () => {
                const dice: Dice = new Dice(die1, JokerDie, die3, die4, die5);
                const cell: IPlayableCell = new NumberCell(CellType.Ones, 1);
                cell.fill(dice);
                assert.equal(cell.value, 2);
            });

            it("NumberCell type", () => {
                const cell: IPlayableCell = new NumberCell(CellType.Ones, 1);
                assert.equal(CellType.Ones, cell.type);
            });

            it("valueFor()", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new NumberCell(CellType.Ones, 1);
                assert.equal(cell.valueFor(dice), 1);
            });

            it("NumberCell type", () => {
                const cell: IPlayableCell = new NumberCell(CellType.Ones, 1);
                assert.equal(CellType.Ones, cell.type);
            });
        });

        describe("RoyalDiceCell", () => {
            it("RoyalDice - 50", () => {
                const dice: Dice = new Dice(die1, die1, die1, die1, die1);
                const cell: IPlayableCell = new RoyalDiceCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostRoyalDice);
            });

            it("RoyalDice Joker - 50", () => {
                const dice: Dice = new Dice(die1, die1, die1, die1, JokerDie);
                const cell: IPlayableCell = new RoyalDiceCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostRoyalDice);
            });

            it("RoyalDice 5 Jokers - 50", () => {
                const dice: Dice = new Dice(JokerDie, JokerDie, JokerDie, JokerDie, JokerDie);
                const cell: IPlayableCell = new RoyalDiceCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostRoyalDice);
            });

            it("RoyalDice valueFor", () => {
                const dice: Dice = new Dice(die1, die1, die1, die1, die1);
                const cell: IPlayableCell = new RoyalDiceCell();
                assert.equal(cell.valueFor(dice), Config.CostRoyalDice);
            });

            it("RoyalDice type", () => {
                const cell: IPlayableCell = new RoyalDiceCell();
                assert.equal(CellType.RoyalDice, cell.type);
            });

            it("RoyalDice - 0", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new RoyalDiceCell();
                cell.fill(dice);
                assert.equal(cell.value, 0);
            });
        });

        describe("ChanceCell", () => {
            it("Chance - 15", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new ChanceCell();
                cell.fill(dice);
                assert.equal(cell.value, 15);
            });

            it("Chance joker - 10", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, JokerDie); // Joker value equals 0
                const cell: IPlayableCell = new ChanceCell();
                cell.fill(dice);
                assert.equal(cell.value, 10);
            });

            it("Chance - valueFor()", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new ChanceCell();
                assert.equal(cell.valueFor(dice), 15);
            });

            it("Chance type", () => {
                const cell: IPlayableCell = new ChanceCell();
                assert.equal(CellType.Chance, cell.type);
            });
        });

        describe("KindsCell", () => {
            it("3 Kind - 7", () => {
                const dice: Dice = new Dice(die1, die1, die1, die2, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                cell.fill(dice);
                assert.equal(cell.value, 7);
            });

            it("3 Kind joker - 7", () => {
                const dice: Dice = new Dice(die1, die1, JokerDie, die2, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                cell.fill(dice);
                assert.equal(cell.value, 6);
            });

            it("3 Kind 2 jokers - 7", () => {
                const dice: Dice = new Dice(die1, JokerDie, JokerDie, die2, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                cell.fill(dice);
                assert.equal(cell.value, 5);
            });

            it("3 Kind 3 jokers - 7", () => {
                const dice: Dice = new Dice(die1, JokerDie, JokerDie, JokerDie, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                cell.fill(dice);
                assert.equal(cell.value, 3);
            });

            it("3 Kind - valueFor", () => {
                const dice: Dice = new Dice(die1, die1, die1, die2, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                assert.equal(cell.valueFor(dice), 7);
            });

            it("3 Kind type", () => {
                const cell: IPlayableCell = new KindCell(CellType.Chance, 3);
                assert.equal(CellType.Chance, cell.type);
            });

            it("3 Kind - 0", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new KindCell(CellType.Kind3, 3);
                cell.fill(dice);
                assert.equal(cell.value, 0);
            });

            it("4 Kind - 6", () => {
                const dice: Dice = new Dice(die1, die1, die1, die1, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind4, 4);
                cell.fill(dice);
                assert.equal(cell.value, 6);
            });

            it("4 Kind 3 jokers - 3", () => {
                const dice: Dice = new Dice(die1, JokerDie, JokerDie, JokerDie, die2);
                const cell: IPlayableCell = new KindCell(CellType.Kind4, 4);
                cell.fill(dice);
                assert.equal(cell.value, 3);
            });

            it("4 Kind 4 jokers - 1", () => {
                const dice: Dice = new Dice(die1, JokerDie, JokerDie, JokerDie, JokerDie);
                const cell: IPlayableCell = new KindCell(CellType.Kind4, 4);
                cell.fill(dice);
                assert.equal(cell.value, 1);
            });
        });

        describe("FullHouseCell", () => {
            it("FullHouseCell - 25", () => {
                const dice: Dice = new Dice(die1, die1, die2, die2, die2);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell joker - 25", () => {
                const dice: Dice = new Dice(die1, die1, die2, die2, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell 2 jokers - 25", () => {
                const dice: Dice = new Dice(die1, die1, die2, JokerDie, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell 3 jokers - 25", () => {
                const dice: Dice = new Dice(die1, JokerDie, die2, JokerDie, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell 3 jokers #2 - 25", () => {
                const dice: Dice = new Dice(die1, JokerDie, die1, JokerDie, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell 4 jokers - 25", () => {
                const dice: Dice = new Dice(die1, JokerDie, JokerDie, JokerDie, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell 5 jokers - 25", () => {
                const dice: Dice = new Dice(JokerDie, JokerDie, JokerDie, JokerDie, JokerDie);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell - valueFor", () => {
                const dice: Dice = new Dice(die1, die1, die2, die2, die2);
                const cell: IPlayableCell = new FullHouseCell();
                assert.equal(cell.valueFor(dice), Config.CostFullHouse);
            });

            it("FullHouseCell type", () => {
                const dice: Dice = new Dice(die1, die1, die2, die2, die2);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, Config.CostFullHouse);
            });

            it("FullHouseCell - 0", () => {
                const dice: Dice = new Dice(die1, die1, die2, die2, die3);
                const cell: IPlayableCell = new FullHouseCell();
                cell.fill(dice);
                assert.equal(cell.value, 0);
            });
        });

        describe("StraightsCell", () => {
            it("SmallStraight - 30", () => {
                const dice: Dice = new Dice(die2, die3, die1, die4, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight joker first - 30", () => {
                const dice: Dice = new Dice(die2, die3, JokerDie, die4, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight joker second - 30", () => {
                const dice: Dice = new Dice(JokerDie, die3, die1, die4, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight 2 jokers - 30", () => {
                const dice: Dice = new Dice(JokerDie, die3, JokerDie, die4, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight 2 jokers #2 - 30", () => {
                const dice: Dice = new Dice(JokerDie, die1, JokerDie, die5, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight 3 jokers - 30", () => {
                const dice: Dice = new Dice(JokerDie, die1, JokerDie, JokerDie, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight 4 jokers - 30", () => {
                const dice: Dice = new Dice(JokerDie, JokerDie, JokerDie, JokerDie, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostSmallStraight);
            });

            it("SmallStraight - valueFor", () => {
                const dice: Dice = new Dice(die2, die3, die1, die4, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                assert.equal(cell.valueFor(dice), Config.CostSmallStraight);
            });

            it("SmallStraight type", () => {
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                assert.equal(cell.type, CellType.SmallStraight);
            });

            it("SmallStraight - 0", () => {
                const dice: Dice = new Dice(die2, die3, die1, die5, die6);
                const cell: IPlayableCell = new StraightCell(CellType.SmallStraight, Config.CostSmallStraight, 4);
                cell.fill(dice);
                assert.equal(cell.value, 0);
            });

            it("LargeStraight - 40", () => {
                const dice: Dice = new Dice(die2, die3, die1, die4, die5);
                const cell: IPlayableCell = new StraightCell(CellType.LargeStraight, Config.CostLargeStraight, 5);
                cell.fill(dice);
                assert.equal(cell.value, Config.CostLargeStraight);
            });
        });
    });

    describe("Service cells", () => {
        let card: ICard;

        beforeEach(() => {
            card = new Card(
                new DefaultCardCellsFactory(),

                CellType.Ones,
                CellType.Twos,
                CellType.Threes,
                CellType.Fours,
                CellType.Fives,
                CellType.Sixes,

                CellType.ServiceTotalNumbers,
                CellType.ServiceBonus63,
                CellType.ServiceTopPoints,
                CellType.ServiceTotalNumbersWithBonus,

                CellType.Kind3,
                CellType.Kind4,
                CellType.FullHouse,
                CellType.SmallStraight,
                CellType.LargeStraight,
                CellType.RoyalDice,
                CellType.Chance,

                CellType.ServiceBonusRoyal,
                CellType.ServiceBottomPoints,
                CellType.ServiceTotalBonuses,
                CellType.ServiceFinalScore
            );
        });

        describe("TotalNumbersCell", () => {
            it("Type", () => {
                assert.equal(new TotalNumbersCell().type, CellType.ServiceTotalNumbers);
            });

            it("Zero", () => {
                const totalNumbers: IServiceCell = card.getCellService(CellType.ServiceTotalNumbers);
                assert.equal(totalNumbers.value, 0);
            });

            it("1-6", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die2, die3, die4, die5));

                const totalNumbers: IServiceCell = card.getCellService(CellType.ServiceTotalNumbers);
                assert.equal(totalNumbers.value, 21);
            });
        });

        describe("Bonus63Cells", () => {
            it("Type", () => {
                assert.equal(new Bonus63Cell().type, CellType.ServiceBonus63);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceBonus63);
                assert.equal(amount.value, 0);
            });

            it("Zero bonus", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die2, die3, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceBonus63);
                assert.equal(amount.value, 0);
            });

            it("Full bonus", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die5, die6));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die1, die2));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceBonus63);
                assert.equal(amount.value, Config.CostBonus63);
            });
        });

        describe("TotalNumbersWithBonusCell", () => {
            it("Type", () => {
                assert.equal(new TotalNumbersWithBonusCell().type, CellType.ServiceTotalNumbersWithBonus);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceTotalNumbersWithBonus);
                assert.equal(amount.value, 0);
            });

            it("Zero bonus", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die2, die3, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceTotalNumbersWithBonus);
                assert.equal(amount.value, 21);
            });

            it("Full bonus", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die5, die6));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die1, die2));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceTotalNumbersWithBonus);
                assert.equal(amount.value, Config.CostBonus63 + 63);
            });

            // TODO: Исключение, если в карточке нет соответствующих полей
        });

        describe("Top points", () => {
            it("Type", () => {
                assert.equal(new TopPointsCell().type, CellType.ServiceTopPoints);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceTopPoints);
                assert.equal(amount.value, 0);
            });

            it("Just points", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die2, die3, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceTopPoints);
                assert.equal(amount.value, 21);
            });

            it("Full bonus", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die5, die6));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die1, die2));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die4, die5));

                const amount: IServiceCell = card.getCellService(CellType.ServiceTopPoints);
                assert.equal(amount.value, Config.CostBonus63 + 63);
            });
        });

        describe("Bottom points", () => {
            it("Type", () => {
                assert.equal(new BottomPointsCell().type, CellType.ServiceBottomPoints);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceBottomPoints);
                assert.equal(amount.value, 0);
            });

            it("Just playable values", () => {
                card.getCellPlayable(CellType.Kind3).fill(
                    new Dice(die1, die1, die1, die2, die2)); // 3 + 4 = 7;
                card.getCellPlayable(CellType.Kind4).fill(
                    new Dice(die1, die1, die1, die1, die2)); // 4 + 2 = 6;
                card.getCellPlayable(CellType.FullHouse).fill(new Dice(die1, die1, die1, die2, die2));
                card.getCellPlayable(CellType.SmallStraight).fill(new Dice(die1, die2, die3, die4, die6));
                card.getCellPlayable(CellType.LargeStraight).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.RoyalDice).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Chance).fill(new Dice(die1, die2, die3, die4, die5)); // 15

                const amount: IServiceCell = card.getCellService(CellType.ServiceBottomPoints);
                assert.equal(amount.value, 7 + 6 + 15 +
                    Config.CostFullHouse + Config.CostSmallStraight + Config.CostLargeStraight + Config.CostRoyalDice);
            });

            it("With RD bonus", () => {
                // TODO:
            });
        });

        describe("BonusRoyal", () => {
            it("Type", () => {
                assert.equal(new BonusRoyalCell().type, CellType.ServiceBonusRoyal);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceBonusRoyal);
                assert.equal(amount.value, 0);
            });

            it("All royaldices", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die1, die1));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die2, die2));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die3, die3));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die4, die4));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die5, die5));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Kind3).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Kind4).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.FullHouse).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.SmallStraight).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.LargeStraight).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.RoyalDice).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Chance).fill(new Dice(die6, die6, die6, die6, die6));

                const amount: IServiceCell = card.getCellService(CellType.ServiceBonusRoyal);
                assert.equal(amount.value, Config.CostRoyalBonusPerItem * 12);
            });

            it("One royaldice doesn't matter", () => {
                card.getCellPlayable(CellType.RoyalDice).fill(new Dice(die6, die6, die6, die6, die6));

                const amount: IServiceCell = card.getCellService(CellType.ServiceBonusRoyal);
                assert.equal(amount.value, 0);
            });

            it("Royaldice somewhere else doesn't matter too", () => {
                card.getCellPlayable(CellType.Chance).fill(new Dice(die6, die6, die6, die6, die6));

                const amount: IServiceCell = card.getCellService(CellType.ServiceBonusRoyal);
                assert.equal(amount.value, 0);
            });
        });

        describe("Total bonuses", () => {
            it("Type", () => {
                assert.equal(new TotalBonusesCell().type, CellType.ServiceTotalBonuses);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceTotalBonuses);
                assert.equal(amount.value, 0);
            });

            it("Both bonuses", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die4, die5));
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die4, die5));
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die4, die5));
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die5, die6));
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die1, die2));
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die4, die5));

                card.getCellPlayable(CellType.RoyalDice).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Chance).fill(new Dice(die6, die6, die6, die6, die6));

                const amount: IServiceCell = card.getCellService(CellType.ServiceTotalBonuses);
                assert.equal(amount.value, Config.CostBonus63 + Config.CostRoyalBonusPerItem);
            });
        });

        describe("Final score", () => {
            it("Type", () => {
                assert.equal(new FinalScoreCell().type, CellType.ServiceFinalScore);
            });

            it("Zero", () => {
                const amount: IServiceCell = card.getCellService(CellType.ServiceFinalScore);
                assert.equal(amount.value, 0);
            });

            it("All Points", () => {
                card.getCellPlayable(CellType.Ones).fill(new Dice(die1, die1, die1, die4, die5));   // 3
                card.getCellPlayable(CellType.Twos).fill(new Dice(die2, die2, die2, die4, die5));   // 6
                card.getCellPlayable(CellType.Threes).fill(new Dice(die3, die3, die3, die4, die5)); // 9
                card.getCellPlayable(CellType.Fours).fill(new Dice(die4, die4, die4, die5, die6));  // 12
                card.getCellPlayable(CellType.Fives).fill(new Dice(die5, die5, die5, die1, die2));  // 15
                card.getCellPlayable(CellType.Sixes).fill(new Dice(die6, die6, die6, die4, die5));  // 18

                card.getCellPlayable(CellType.Kind3).fill(
                    new Dice(die1, die1, die1, die2, die2)); // 3 + 4 = 7;
                card.getCellPlayable(CellType.Kind4).fill(
                    new Dice(die1, die1, die1, die1, die2)); // 4 + 2 = 6;
                card.getCellPlayable(CellType.FullHouse).fill(new Dice(die1, die1, die1, die2, die2));
                card.getCellPlayable(CellType.SmallStraight).fill(new Dice(die1, die2, die3, die4, die6));
                card.getCellPlayable(CellType.LargeStraight).fill(new Dice(die1, die2, die3, die4, die5));
                card.getCellPlayable(CellType.RoyalDice).fill(new Dice(die6, die6, die6, die6, die6));
                card.getCellPlayable(CellType.Chance).fill(new Dice(die6, die6, die6, die6, die6)); // 30

                const amount: IServiceCell = card.getCellService(CellType.ServiceFinalScore);
                assert.equal(amount.value, 63 + 7 + 6 + 30 +
                    Config.CostBonus63 + Config.CostFullHouse +
                    Config.CostSmallStraight + Config.CostLargeStraight + Config.CostRoyalDice +
                    Config.CostRoyalBonusPerItem);
            });
        });
    });

    describe("Decorators", () => {
        describe("MultiplierCellDecorator", () => {
            it("vaslue", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new MultiplierCellDecorator(new NumberCell(CellType.Ones, 1), 2);
                cell.fill(dice);
                assert.equal(cell.value, 2);
            });

            it("valueFor", () => {
                const dice: Dice = new Dice(die1, die2, die3, die4, die5);
                const cell: IPlayableCell = new MultiplierCellDecorator(new NumberCell(CellType.Ones, 1), 2);
                assert.equal(cell.valueFor(dice), 2);
            });
        });
    });
});
