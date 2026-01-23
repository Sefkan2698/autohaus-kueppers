import express from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';
export declare class UserController {
    getAll(req: AuthRequest, res: express.Response): Promise<void>;
    getById(req: AuthRequest, res: express.Response): Promise<void>;
    create(req: AuthRequest, res: express.Response): Promise<void>;
    update(req: AuthRequest, res: express.Response): Promise<void>;
    delete(req: AuthRequest, res: express.Response): Promise<void>;
    getCurrentUser(req: AuthRequest, res: express.Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=user.controller.d.ts.map