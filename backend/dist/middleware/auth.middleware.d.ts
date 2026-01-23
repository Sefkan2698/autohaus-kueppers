import express from 'express';
export interface AuthRequest extends express.Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: express.Response, next: express.NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map