import { PartialType } from '@nestjs/swagger';
import { CreateStarshipsDto } from './create-starships.dto';

export class UpdateStarshipsDto extends PartialType(CreateStarshipsDto) {}
