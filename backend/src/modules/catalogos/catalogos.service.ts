import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import { CatalogoItemDto } from './dto/catalogo-item.dto.js';

@Injectable()
export class CatalogosService {
  private readonly logger = new Logger(CatalogosService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todos los catálogos activos agrupados por categoría.
   * Ejemplo de respuesta: { eps: [...], estrato: [...], tipo_documento: [...] }
   */
  async obtenerTodosAgrupados(): Promise<Record<string, CatalogoItemDto[]>> {
    const catalogos = await this.prisma.catalogo.findMany({
      where: { activo: true },
      orderBy: [
        { categoria: 'asc' },
        { orden: 'asc' },
        { valor: 'asc' },
      ],
      select: {
        id: true,
        categoria: true,
        valor: true,
        orden: true,
        activo: true,
      },
    });

    const agrupados: Record<string, CatalogoItemDto[]> = {};

    for (const item of catalogos) {
      if (!agrupados[item.categoria]) {
        agrupados[item.categoria] = [];
      }
      agrupados[item.categoria].push(item);
    }

    return agrupados;
  }

  /**
   * Obtiene todas las opciones activas de una categoría específica.
   * @param categoria Nombre de la categoría (ej: 'eps', 'estrato')
   */
  async obtenerPorCategoria(categoria: string): Promise<CatalogoItemDto[]> {
    const categoriaNormalizada = categoria.trim().toLowerCase();

    return this.prisma.catalogo.findMany({
      where: {
        categoria: categoriaNormalizada,
        activo: true,
      },
      orderBy: [
        { orden: 'asc' },
        { valor: 'asc' },
      ],
      select: {
        id: true,
        categoria: true,
        valor: true,
        orden: true,
        activo: true,
      },
    });
  }

  /**
   * Obtiene la lista de nombres únicos de categorías registradas en el sistema.
   */
  async obtenerCategoriasDisponibles(): Promise<string[]> {
    const categorias = await this.prisma.catalogo.findMany({
      where: { activo: true },
      distinct: ['categoria'],
      select: { categoria: true },
      orderBy: { categoria: 'asc' },
    });

    return categorias.map((c) => c.categoria);
  }
}
