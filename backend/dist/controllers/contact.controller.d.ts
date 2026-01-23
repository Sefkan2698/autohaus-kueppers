import express from 'express';
export declare class ContactController {
    submit(req: express.Request, res: express.Response): Promise<void>;
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getById(req: express.Request, res: express.Response): Promise<void>;
    updateStatus(req: express.Request, res: express.Response): Promise<void>;
    delete(req: express.Request, res: express.Response): Promise<void>;
}
declare const _default: ContactController;
export default _default;
//# sourceMappingURL=contact.controller.d.ts.map