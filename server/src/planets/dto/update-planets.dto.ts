import { PartialType } from '@nestjs/swagger';
import { CreatePlanetsDto } from './create-planets.dto';

export class UpdatePlanetsDto extends PartialType(CreatePlanetsDto) {}
