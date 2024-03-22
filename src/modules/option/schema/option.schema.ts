import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

@Schema()
export class Option extends Document {
  @Prop({ required: true })
  question_id: string;

  @Prop({ required: true })
  option_1: string;

  @Prop({ required: true })
  option_2: string;

  @Prop({ required: true })
  option_3: string;

  @Prop({ required: true })
  option_4: string;

  @Prop({ required: true })
  corrected: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
