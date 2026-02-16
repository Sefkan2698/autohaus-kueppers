import prisma from '../utils/prisma.js';

export class NewModelService {
  async getAll(isActive?: boolean) {
    const where = isActive !== undefined ? { isActive } : {};

    return await prisma.newModel.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async getById(id: string) {
    return await prisma.newModel.findUnique({
      where: { id },
    });
  }

  async create(data: {
    title: string;
    description: string;
    imageUrl: string;
    alt?: string;
    order?: number;
    isActive?: boolean;
  }) {
    return await prisma.newModel.create({
      data,
    });
  }

  async update(id: string, data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    alt?: string;
    order?: number;
    isActive?: boolean;
  }) {
    return await prisma.newModel.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.newModel.delete({
      where: { id },
    });
  }

  async toggleActive(id: string) {
    const model = await prisma.newModel.findUnique({ where: { id } });
    if (!model) throw new Error('Modell nicht gefunden');

    return await prisma.newModel.update({
      where: { id },
      data: { isActive: !model.isActive },
    });
  }

  async reorder(models: { id: string; order: number }[]) {
    const updates = models.map(({ id, order }) =>
      prisma.newModel.update({
        where: { id },
        data: { order },
      })
    );

    return await prisma.$transaction(updates);
  }
}

export default new NewModelService();
