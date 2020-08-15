import { Controller, Get, Query, DefaultValuePipe, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { BearerAuthGuard } from 'src/auth/guards/bearer-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Currency } from './schemas/currency.schema';

@ApiTags('currency')
@Controller()
export class CurrencyController {

    constructor(
        private currencyService: CurrencyService
    ) { }

    @ApiResponse({
        status: 200,
        description: 'get currencies',
        type: [Currency]
    })
    @ApiBearerAuth()
    @Get('currencies')
    @UseGuards(BearerAuthGuard)
    find(
        @Query('limit') limit: string,
        @Query('offset', new DefaultValuePipe(0)) offset: string,
    ) {
        return this.currencyService.find(limit, offset);
    }

    @ApiResponse({
        status: 200,
        description: 'get currency by id',
        type: Currency
    })
    @ApiBearerAuth()
    @Get('/currency/:id')
    @UseGuards(BearerAuthGuard)
    async findOne(
        @Param('id') id: string
    ) {
        const currency = await this.currencyService.findOneByValuteID(id);

        if (!currency) {
            throw new NotFoundException('currency is not defined');
        }

        return currency;
    }
}
