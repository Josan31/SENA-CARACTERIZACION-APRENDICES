import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class ModuloBasicaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es requerido' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es requerido' })
  tipoDoc: string;

  @IsString()
  @IsOptional()
  numDoc?: string;

  @IsString()
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD',
  })
  fechaNac: string;

  @IsOptional()
  edad?: string | number; // Se descarta en BD (R5), se calcula desde fechaNac

  @IsString()
  @IsNotEmpty({ message: 'El sexo es requerido' })
  sexo: string;

  @IsString()
  @IsNotEmpty({ message: 'La respuesta de autoreconocimiento LGBTIQ es requerida' })
  lgbtiq: string;

  @IsString()
  @IsOptional()
  orientacion?: string;

  @IsString()
  @IsNotEmpty({ message: 'El estado civil es requerido' })
  estadoCivil: string;

  @IsString()
  @IsNotEmpty({ message: 'El correo personal es requerido' })
  correoPersonal: string;

  @IsString()
  @IsOptional()
  correoInst?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  acudiente?: string;

  @IsString()
  @IsOptional()
  telAcudiente?: string;

  @IsString()
  @IsOptional()
  parentesco?: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  direccion: string;

  @IsString()
  @IsNotEmpty({ message: 'El municipio es requerido' })
  municipio: string;

  @IsString()
  @IsNotEmpty({ message: 'El estrato es requerido' })
  estrato: string;
}
