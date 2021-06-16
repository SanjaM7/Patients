import { Address } from "./address";

export interface PatientListItemWithDoctor {
    id: number;
    registeredDate: string;
    firstName: string;
    lastName: string;
    doctor: string | null;
    addresses: Address[];
}