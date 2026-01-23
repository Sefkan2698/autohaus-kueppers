import { BannerType } from '@prisma/client';
export declare class InfoBannerService {
    getAll(filters?: {
        type?: BannerType;
        isActive?: boolean;
    }): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }[]>;
    getById(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }>;
    create(data: {
        title: string;
        message: string;
        type?: BannerType;
        link?: string;
        linkText?: string;
        startDate?: Date;
        endDate?: Date;
        priority?: number;
    }): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }>;
    update(id: string, data: {
        title?: string;
        message?: string;
        type?: BannerType;
        link?: string;
        linkText?: string;
        startDate?: Date;
        endDate?: Date;
        priority?: number;
        isActive?: boolean;
    }): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }>;
    delete(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }>;
    toggleActive(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.BannerType;
        isActive: boolean;
        message: string;
        linkText: string | null;
        startDate: Date | null;
        endDate: Date | null;
        priority: number;
    }>;
}
declare const _default: InfoBannerService;
export default _default;
//# sourceMappingURL=infobanner.service.d.ts.map