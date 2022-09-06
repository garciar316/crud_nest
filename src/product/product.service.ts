import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/createProductDto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    return this.productModel.find();
  }

  async getProduct(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async createProduct(createProductDto: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }

  async updateProduct(
    id: string,
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, createProductDto, {
      new: true,
    });
  }
}
