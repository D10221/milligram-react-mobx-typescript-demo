import { observable, action} from "mobx";
export class PopoverStore {
    @observable open = "";
    isOpen = (id: string) => {
        return this.open === id;
    }
    @action toggleOpen = (id: string) => () => {
        this.open = this.open === id ? "" : id;
    }
}