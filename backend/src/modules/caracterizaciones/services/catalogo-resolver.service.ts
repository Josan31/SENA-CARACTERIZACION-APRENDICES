import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service.js';

@Injectable()
export class CatalogoResolverService {
  private readonly logger = new Logger(CatalogoResolverService.name);
  private catalogMap = new Map<string, string>();
  private loaded = false;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Carga o refresca el mapa en memoria de catálogos activos.
   * Clave: `${categoriaNormalizada}:${valorNormalizado}` -> ID (UUID).
   */
  async inicializar(): Promise<void> {
    const catalogos = await this.prisma.catalogo.findMany({
      where: { activo: true },
      select: { id: true, categoria: true, valor: true },
    });

    this.catalogMap.clear();
    for (const item of catalogos) {
      const key = `${item.categoria.trim().toLowerCase()}:${item.valor.trim().toLowerCase()}`;
      this.catalogMap.set(key, item.id);
    }

    this.loaded = true;
    this.logger.log(`Catálogo inicializado en memoria con ${this.catalogMap.size} opciones.`);
  }

  /**
   * Resuelve el ID del catálogo según categoría y valor textual (Regla R1).
   * Si opcional = true y el valor es nulo/vacío, retorna null.
   * Si no se encuentra, arroja 422 UnprocessableEntityException.
   */
  async resolver(
    categoria: string,
    valor: string | null | undefined,
    campo: string,
    opcional = false,
  ): Promise<string | null> {
    if (!this.loaded) {
      await this.inicializar();
    }

    if (!valor || valor.trim() === '') {
      if (opcional) return null;
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: `El campo '${campo}' requiere un valor de catálogo válido`,
        error: 'Unprocessable Entity',
        detalle: { campo, valor: null, categoria },
      });
    }

    const catNorm = categoria.trim().toLowerCase();
    const valNorm = valor.trim().toLowerCase();
    const key = `${catNorm}:${valNorm}`;

    const id = this.catalogMap.get(key);
    if (id) {
      return id;
    }

    // Si no está y es opcional con valores estándar de descarte (R3)
    if (opcional) {
      return null;
    }

    throw new UnprocessableEntityException({
      statusCode: 422,
      message: `Opción '${valor}' no válida para el catálogo '${categoria}' en el campo '${campo}'`,
      error: 'Unprocessable Entity',
      detalle: { campo, valor, categoria },
    });
  }

  /**
   * Intenta resolver si existe la opción, retornando null si no se encuentra (sin arrojar excepción).
   */
  async resolverSeguro(
    categoria: string,
    valor: string | null | undefined,
  ): Promise<string | null> {
    if (!this.loaded) {
      await this.inicializar();
    }
    if (!valor || valor.trim() === '') return null;
    const key = `${categoria.trim().toLowerCase()}:${valor.trim().toLowerCase()}`;
    return this.catalogMap.get(key) || null;
  }
}
