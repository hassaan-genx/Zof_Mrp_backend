import { Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CommonApiResponses } from 'src/common/decorators/common-api-response.decorator';
import { ControllerAuthProtector } from 'src/common/decorators/controller-auth-protector';
import { ApiBody } from '@nestjs/swagger';

@ControllerAuthProtector('Products', 'products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @HttpCode(HttpStatus.CREATED)
  @CommonApiResponses('Create a new product')
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: any) {
    try {
      return this.productsService.create(createProductDto, user.email);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get all products')
  findAll() {
    try {
      return this.productsService.getAllProducts();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get a product by id')
  findOne(@Param('id') id: string) {
    try {
      return this.productsService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiBody({ type: CreateProductDto })
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Update a product by id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() user: any) {
    try {
      return this.productsService.update(+id, updateProductDto, user.email);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @CommonApiResponses('Delete a product by id')
  remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @Get('availablecolors/:id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get available colors by product id')
  async getAvailableColorsByProductId(@Param('id') productId: number): Promise<any> {
    try {
      return this.productsService.getAvailableColorsByProductId(productId);
    } catch (error) {
      throw error;
    }
  }

  @Get('cut-options/:id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get available cut options by product id')
  async getProductCutOptions(@Param('id') id: string) {
    try {
      return await this.productsService.getAvailableCutOptionsByProductId(+id);
    } catch (error) {
      throw error;
    }
  }

  @Get('sleeve-types/:id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get available sleeve types by product id')
  async getProductSleeveTypes(@Param('id') id: string) {
    try {
      return await this.productsService.getAvailableSleeveTypesByProductId(+id);
    } catch (error) {
      throw error;
    }
  }

  @Get('available-sizes/:id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get available sleeve types by product id')
  async getAvailableSizes(@Param('id') id: string) {
    try {
      return await this.productsService.getAvailableSizesByProductId(+id);
    } catch (error) {
      throw error;
    }
  }
}
