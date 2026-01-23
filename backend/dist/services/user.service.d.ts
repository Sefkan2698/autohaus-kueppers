import { Role } from '@prisma/client';
export declare class UserService {
    getAll(): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(email: string, password: string, name: string, role?: Role): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    update(id: string, data: {
        email?: string;
        name?: string;
        role?: Role;
        password?: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string, requestingUserId: string): Promise<{
        success: boolean;
    }>;
    emailExists(email: string, excludeId?: string): Promise<boolean>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map