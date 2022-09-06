import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product;

@Schema()
export class Product extends Document {
  @Prop({ type: String })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageURL: string;

  @Prop()
  price: number;

  @Prop({ type: Date })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
