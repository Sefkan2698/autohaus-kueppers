export declare class CarouselService {
    getAll(isActive?: boolean): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }[]>;
    getById(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }>;
    create(data: {
        url: string;
        alt?: string;
        title?: string;
        subtitle?: string;
        textPosition?: string;
        link?: string;
        order?: number;
        isActive?: boolean;
    }): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }>;
    update(id: string, data: {
        url?: string;
        alt?: string;
        title?: string;
        subtitle?: string;
        textPosition?: string;
        link?: string;
        order?: number;
        isActive?: boolean;
    }): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }>;
    delete(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }>;
    toggleActive(id: string): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }>;
    reorder(images: {
        id: string;
        order: number;
    }[]): Promise<{
        link: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        isActive: boolean;
        url: string;
        alt: string | null;
        order: number;
        subtitle: string | null;
        textPosition: string;
    }[]>;
}
declare const _default: CarouselService;
export default _default;
//# sourceMappingURL=carousel.service.d.ts.map