import { PopoverStore } from "./popover-store";
export class Stores {
    popovers = new PopoverStore();
}
export const stores = new Stores();