import { z } from 'zod';
export declare const createVehicleSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<{
        DEMO_CAR: "DEMO_CAR";
        USED_CAR: "USED_CAR";
        YEAR_CAR: "YEAR_CAR";
    }>;
    brand: z.ZodString;
    model: z.ZodString;
    price: z.ZodNumber;
    mileage: z.ZodNumber;
    yearBuilt: z.ZodNumber;
    firstRegistration: z.ZodOptional<z.ZodString>;
    fuelType: z.ZodString;
    transmission: z.ZodString;
    power: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    doors: z.ZodOptional<z.ZodNumber>;
    seats: z.ZodOptional<z.ZodNumber>;
    features: z.ZodOptional<z.ZodArray<z.ZodString>>;
    description: z.ZodString;
    condition: z.ZodOptional<z.ZodString>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateVehicleSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        DEMO_CAR: "DEMO_CAR";
        USED_CAR: "USED_CAR";
        YEAR_CAR: "YEAR_CAR";
    }>>;
    brand: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    mileage: z.ZodOptional<z.ZodNumber>;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
    firstRegistration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    fuelType: z.ZodOptional<z.ZodString>;
    transmission: z.ZodOptional<z.ZodString>;
    power: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    doors: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    seats: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    features: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    description: z.ZodOptional<z.ZodString>;
    condition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
//# sourceMappingURL=vehicle.validator.d.ts.map