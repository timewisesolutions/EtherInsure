import { createContext } from 'react';

export type PetInfoContextValue = {
    type: string;
    breed: string;
    name: string;
    age: {
      years: number;
      months: number;
    };
    location: {
      city: string;
      zipCode: string;
    };
    preMedicalCondition: string;
    image: string;
}
export const PetInfoContext =  createContext<PetInfoContextValue | undefined>(undefined);
