import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import  { Author } from './models/author.model';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorInupt } from './input/author.input'
@Injectable()
export class AuthorsService {
    constructor (
        @InjectModel(Author.name)
        private readonly authorModel: Model<Author>
    ){}

    findOneById(id: String) {
        return this.authorModel.findById(id).exec();
    }

    createAuthor(input: AuthorInupt) {
        const author = new this.authorModel(input);
        return author.save();
    }
}