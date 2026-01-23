import { JobType } from '@prisma/client';
export declare class JobService {
    getAll(filters?: {
        type?: JobType;
        department?: string;
        location?: string;
        isActive?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }>;
    create(data: {
        title: string;
        department?: string;
        location: string;
        type: JobType;
        description: string;
        requirements?: string[];
        benefits?: string[];
        salary?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }>;
    update(id: string, data: {
        title?: string;
        department?: string;
        location?: string;
        type?: JobType;
        description?: string;
        requirements?: string[];
        benefits?: string[];
        salary?: string;
        isActive?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.JobType;
        description: string;
        isActive: boolean;
        department: string | null;
        location: string;
        requirements: string[];
        benefits: string[];
        salary: string | null;
    }>;
}
declare const _default: JobService;
export default _default;
//# sourceMappingURL=job.service.d.ts.map