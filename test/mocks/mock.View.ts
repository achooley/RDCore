import {IViewFactory} from "../../src/client/IViewFactory";
import {IMainScreenView, MainScreenController} from "../../src/client/mainScreen/MainScreenController";
import {IRoundView, RoundController} from "../../src/client/round/SingleRoundController";
import {IRound} from "../../src/core/round/Rounds";
import {IResultScreenController, IResultScreenView} from "../../src/client/resultScreen/SingleResultScreenController";

export class MockViewFactory implements IViewFactory {
    public createMainScreenView():IMainScreenView {
        return new MockMainScreenView();
    }

    public createRoundView():IRoundView {
        return new MockRoundView();
    }

    public createRoundResultView():IResultScreenView {
        return new MockResultScreenView();
    }
}

export class MockMainScreenView implements IMainScreenView {
    public init(controller:MainScreenController) {/**/}

    public activate() {/**/}
    public draw() {/**/}

    public sleep() {/**/}
}

export class MockRoundView implements  IRoundView {
    public init(controller:RoundController) {/**/}

    public activate(model:IRound) {/**/}
    public draw() {/**/}
    public exit() {/**/}

    public enableThrowButton() {/**/}
    public disableThrowButton() {/**/}

    public enableCells() {/**/}
    public disableCells() {/**/}
}

export class MockResultScreenView implements IResultScreenView {
    public  init(controller:IResultScreenController) {/**/}
    public activate(model) {/**/}
}
