import express from 'express';
export declare class TeamController {
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getById(req: express.Request, res: express.Response): Promise<void>;
    create(req: express.Request, res: express.Response): Promise<void>;
    update(req: express.Request, res: express.Response): Promise<void>;
    updateWithImage(req: express.Request, res: express.Response): Promise<void>;
    delete(req: express.Request, res: express.Response): Promise<void>;
    toggleActive(req: express.Request, res: express.Response): Promise<void>;
    reorder(req: express.Request, res: express.Response): Promise<void>;
}
declare const _default: TeamController;
export default _default;
//# sourceMappingURL=team.controller.d.ts.map