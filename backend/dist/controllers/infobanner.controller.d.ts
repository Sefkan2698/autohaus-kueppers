import type { Request, Response } from 'express';
export declare class InfoBannerController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    toggleActive(req: Request, res: Response): Promise<void>;
}
declare const _default: InfoBannerController;
export default _default;
//# sourceMappingURL=infobanner.controller.d.ts.map