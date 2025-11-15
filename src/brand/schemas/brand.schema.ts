import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class BrandDocument {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  website: string;

  @Prop({ type: String, required: true, unique: true, email: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, default: 1 })
  insightId: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date | null;
}

export const BrandSchema = SchemaFactory.createForClass(BrandDocument);
