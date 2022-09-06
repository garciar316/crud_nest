import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/createProductDto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDto: CreateProductDTO) {
    const productCreated = await this.productService.createProduct(
      createProductDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Received',
      productCreated,
    });
  }

  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get(':id')
  async getProduct(@Res() res, @Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException(`No existe un producto con el id: ${id}`);
    }
    res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') id) {
    const productDeleted = await this.productService.deleteProduct(id);
    if (!productDeleted) {
      throw new NotFoundException(`No existe un producto con el id: ${id}`);
    }
    res.status(HttpStatus.OK).json({
      message: 'Se ha eliminado con existo el producto',
      productDeleted,
    });
  }

  @Put('/update/:id')
  async updateProduct(
    @Res() res,
    @Param('id') id,
    @Body() dto: CreateProductDTO,
  ) {
    const productUpdated = await this.productService.updateProduct(id, dto);
    if (!productUpdated) {
      throw new NotFoundException(`No existe un producto con el id: ${id}`);
    }
    res.status(HttpStatus.OK).json({
      message: 'Se actualizo con existo el registro',
      productUpdated,
    });
  }
}
