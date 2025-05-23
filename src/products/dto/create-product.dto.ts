import { IsNotEmpty, ValidateNested, IsArray, IsNumber, IsInt, Min, IsString, MaxLength, IsOptional, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonApiProperty } from 'src/common/decorators/common-api-response.decorator';
import { ApiProperty } from '@nestjs/swagger';

class ProductColorDto {
  @CommonApiProperty('Product Color Id', '1')
  Id: number;

  @CommonApiProperty('Color Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  colorId: number;

  @CommonApiProperty('Image Id', '1')
  @IsNotEmpty()
  ImageId: string;
}

export class ProductDetailDto {
  @CommonApiProperty('Product Detail Id', '1')
  Id: number;

  @CommonApiProperty('Product Cut Option Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  ProductCutOptionId: number;

  @CommonApiProperty('Product Size Measurement Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  ProductSizeMeasurementId: number;

  @CommonApiProperty('Sleeve Type Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  SleeveTypeId: number;
}

export class CreateProductDto {
  @CommonApiProperty('Product Category Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  ProductCategoryId: number;

  @CommonApiProperty('Fabric Type Id', '1')
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  FabricTypeId: number;

  @CommonApiProperty('Description', 'Description goes here')
  @IsString()
  @IsOptional()
  @MaxLength(255)
  Description?: string;

  @ApiProperty({ type: [ProductColorDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one Product Color is required' })
  productColors: ProductColorDto[];

  @ApiProperty({ type: [ProductDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDetailDto)
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'At least one Product Detail Option is required' })
  productDetails: ProductDetailDto[];
}
