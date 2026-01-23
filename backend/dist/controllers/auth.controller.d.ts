import express from 'express';
export declare class AuthController {
    login(req: express.Request, res: express.Response): Promise<void>;
    register(req: express.Request, res: express.Response): Promise<void>;
    forgotPassword(req: express.Request, res: express.Response): Promise<void>;
    resetPassword(req: express.Request, res: express.Response): Promise<void>;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map