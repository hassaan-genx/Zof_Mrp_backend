import { Body, Delete, Get, Param, Post, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PrintingoptionsService } from './printingoptions.service';
import { CreatePrintingOptionDto, UpdatePrintingOptionDto } from './dto/printing-option.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CommonApiResponses } from 'src/common/decorators/common-api-response.decorator';
import { ControllerAuthProtector } from 'src/common/decorators/controller-auth-protector';
import { ApiBody } from '@nestjs/swagger';
@ControllerAuthProtector('Printing Options', 'printingoptions')
export class PrintingoptionsController {
  constructor(private readonly printingOptionsService: PrintingoptionsService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get all printing options')
  async findAll() {
    try {
      return this.printingOptionsService.getAllPrintingOptions();
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiBody({ type: CreatePrintingOptionDto })
  @HttpCode(HttpStatus.CREATED)
  @CommonApiResponses('Create a new printing option')
  create(@Body() createPrintingOptionDto: CreatePrintingOptionDto, @CurrentUser() currentUser: any) {
    try {
      return this.printingOptionsService.create(createPrintingOptionDto, currentUser.email);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Get a printing option by id')
  findOne(@Param('id') id: number) {
    try {
      return this.printingOptionsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @ApiBody({ type: CreatePrintingOptionDto })
  @HttpCode(HttpStatus.OK)
  @CommonApiResponses('Update a printing option by id')
  update(@Param('id') id: string, @Body() updatePrintingOption: UpdatePrintingOptionDto, @CurrentUser() currentUser: any) {
    try {
      return this.printingOptionsService.update(+id, updatePrintingOption, currentUser.email);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @CommonApiResponses('Delete a printing option by id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return this.printingOptionsService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
