import { PartialType } from '@nestjs/swagger';
import { CreateFilmsDto } from './create-films.dto';

export class UpdateFilmsDto extends PartialType(CreateFilmsDto) {}
