import { SubmissionStatus } from '@prisma/client';
export declare class ContactService {
    create(data: {
        name: string;
        email: string;
        phone?: string;
        message: string;
        subject?: string;
        vehicleId?: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        vehicleId: string | null;
        message: string;
        phone: string | null;
        subject: string | null;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    }>;
    getAll(filters?: {
        status?: SubmissionStatus;
        vehicleId?: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        vehicleId: string | null;
        message: string;
        phone: string | null;
        subject: string | null;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    }[]>;
    getById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        vehicleId: string | null;
        message: string;
        phone: string | null;
        subject: string | null;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    }>;
    updateStatus(id: string, status: SubmissionStatus): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        vehicleId: string | null;
        message: string;
        phone: string | null;
        subject: string | null;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
        vehicleId: string | null;
        message: string;
        phone: string | null;
        subject: string | null;
        status: import("@prisma/client").$Enums.SubmissionStatus;
    }>;
}
declare const _default: ContactService;
export default _default;
//# sourceMappingURL=contact.service.d.ts.map