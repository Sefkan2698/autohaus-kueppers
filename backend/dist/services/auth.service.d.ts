import { Role } from '@prisma/client';
export declare class AuthService {
    register(email: string, password: string, name: string, role?: Role): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    verifyToken(token: string): {
        userId: string;
        email: string;
        role: string;
    };
    createPasswordResetToken(email: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
    }>;
    findUserByEmail(email: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map