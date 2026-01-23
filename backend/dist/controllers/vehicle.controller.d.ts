import express from 'express';
export declare class VehicleController {
    getAll(req: express.Request, res: express.Response): Promise<void>;
    getById(req: express.Request, res: express.Response): Promise<void>;
    create(req: express.Request, res: express.Response): Promise<void>;
    update(req: express.Request, res: express.Response): Promise<void>;
    delete(req: express.Request, res: express.Response): Promise<void>;
    toggleActive(req: express.Request, res: express.Response): Promise<void>;
}
declare const _default: VehicleController;
export default _default;
//# sourceMappingURL=vehicle.controller.d.ts.map