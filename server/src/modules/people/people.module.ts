import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../database/entities/people.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer-config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@modules/auth/passport/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    MulterModule.register(getMulterConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, JwtStrategy],
})
export class PeopleModule {}
