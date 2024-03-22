import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesGateway } from './classes.gateway';
import { ClassController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from './schema/class.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Module({
  providers: [ClassesGateway, ClassesService],
  controllers: [ClassController],
  imports: [MongooseModule.forFeature([
    {
      name: "Class",
      schema: ClassSchema
    }
  ])]
})
export class ClassesModule {}
