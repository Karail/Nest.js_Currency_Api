import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'request';
import * as iconv from 'iconv-lite';
import { parseString } from 'xml2js';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { Currency } from './schemas/currency.schema';

export type ValuteType = {
    $: { ID: string },
    NumCode: number[],
    CharCode: string[],
    Nominal: number[],
    Name: string[],
    Value: number[]
}

export type ValCursType = {
    $: { Date: Date, name: string },
    Valute: ValuteType[]
}

@Injectable()
export class CurrencyService {
    constructor(
        @InjectModel(Currency.name)
        private currencyModel: Model<Currency>,
        private configService: ConfigService
    ) { }

    onApplicationBootstrap() {
        this.currencyParce();
    }

    find(limit: string, offset: string) {
        return this.currencyModel
            .find()
            .limit(+limit)
            .skip(+offset)
            .exec();
    }

    findOneByValuteID(id: string) {
        return this.currencyModel.findOne({
            ValuteID: id
        });
    }

    @Cron('45 * * * * *')
    async currencyParce() {
        try {
            const url = this.configService.get<string>('currencyParcer.url');

            request({
                    url,
                    encoding: null
                }, (err, res, body) => {
                    if (err)
                        throw err;
                    const data = iconv.encode(iconv.decode(body, 'win1251'), 'utf-8').toString();
                    
                    parseString(data, async (err, result: { ValCurs: ValCursType }) => {
                        if (err)
                            throw err;
        
                        for (const el of result.ValCurs.Valute) {
                            const {
                                $,
                                NumCode,
                                CharCode,
                                Nominal,
                                Name,
                                Value
                            } = el;
        
                            const currencyData = {
                                ValuteID: $.ID,
                                NumCode: NumCode[0],
                                CharCode: CharCode[0],
                                Nominal: Nominal[0],
                                Name: Name[0],
                                Value: Value[0]
                            }
        
                            try {
                                const currency = await this.currencyModel.findOneAndUpdate({
                                    ValuteID: $.ID
                                }, currencyData).exec();
        
                                if (!currency) {
                                    await this.currencyModel.create(currencyData);
                                }
                            } catch (ex) {
                                throw ex;
                            }
                        }
                        console.log('successful parsing')
                    });
                }
            );
        } catch (ex) {
            console.log(ex);
        }
    }
}
