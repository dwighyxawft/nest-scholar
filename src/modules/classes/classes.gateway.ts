import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@WebSocketGateway()
export class ClassesGateway {
  constructor(private readonly classesService: ClassesService) {}

  // @SubscribeMessage('findAllClasses')
  // findAll() {
  //   return this.classesService.findAll();
  // }

  // @SubscribeMessage('findOneClass')
  // findOne(@MessageBody() id: number) {
  //   return this.classesService.findOne(id);
  // }

  // @SubscribeMessage('updateClass')
  // update(@MessageBody() updateClassDto: UpdateClassDto) {
  //   return this.classesService.update(updateClassDto.id, updateClassDto);
  // }

}
