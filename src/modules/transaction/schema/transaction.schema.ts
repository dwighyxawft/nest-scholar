import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  tutor_id: string;

  user_email: string;

  @Prop({ required: true })
  reference: string;

  @Prop({ type: [{ enum: ["pending", "completed", "failed"] }] })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
