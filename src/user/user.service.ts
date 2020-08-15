import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private useryModel: Model<User>
    ) { }

    async findOneByToken(token: string) {
        return this.useryModel.findOne({ token }).exec();
    }

}
