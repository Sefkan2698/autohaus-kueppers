import prisma from '../utils/prisma.js';
export class CarouselService {
    // Alle Carousel-Bilder abrufen
    async getAll(isActive) {
        const where = isActive !== undefined ? { isActive } : {};
        return await prisma.carouselImage.findMany({
            where,
            orderBy: { order: 'asc' },
        });
    }
    // Einzelnes Carousel-Bild abrufen
    async getById(id) {
        return await prisma.carouselImage.findUnique({
            where: { id },
        });
    }
    // Carousel-Bild erstellen
    async create(data) {
        return await prisma.carouselImage.create({
            data,
        });
    }
    // Carousel-Bild aktualisieren
    async update(id, data) {
        return await prisma.carouselImage.update({
            where: { id },
            data,
        });
    }
    // Carousel-Bild löschen
    async delete(id) {
        return await prisma.carouselImage.delete({
            where: { id },
        });
    }
    // Carousel-Bild aktivieren/deaktivieren
    async toggleActive(id) {
        const image = await prisma.carouselImage.findUnique({ where: { id } });
        if (!image)
            throw new Error('Bild nicht gefunden');
        return await prisma.carouselImage.update({
            where: { id },
            data: { isActive: !image.isActive },
        });
    }
    // Reihenfolge ändern
    async reorder(images) {
        const updates = images.map(({ id, order }) => prisma.carouselImage.update({
            where: { id },
            data: { order },
        }));
        return await prisma.$transaction(updates);
    }
}
export default new CarouselService();
//# sourceMappingURL=carousel.service.js.map