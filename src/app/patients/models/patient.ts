import { Address } from "./address";

export class Patient {
    public constructor(
        public firstName: string,
        public lastName: string,
        public doctor: number,
        public addresses: Address[]
    ) {}
}