import { Address } from "./address";

export interface PatientListItem {
    id: number;
    registeredDate: string;
    firstName: string;
    lastName: string;
    doctor: number;
    addresses: Address[];
}