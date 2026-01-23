export declare class TeamService {
    getAll(isActive?: boolean): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }[]>;
    getById(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }>;
    create(data: {
        name: string;
        title: string;
        url: string;
        alt?: string;
        order?: number;
        isActive?: boolean;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }>;
    update(id: string, data: {
        name?: string;
        title?: string;
        url?: string;
        alt?: string;
        order?: number;
        isActive?: boolean;
    }): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }>;
    toggleActive(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }>;
    reorder(members: {
        id: string;
        order: number;
    }[]): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
    }[]>;
}
declare const _default: TeamService;
export default _default;
//# sourceMappingURL=team.service.d.ts.map