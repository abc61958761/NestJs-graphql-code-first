import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Schema()
export class Author extends Document {
  @Field(() => ID)
  @Prop()
  id: string;

  @Field()
  @Prop()
  firstName?: string;

  @Field()
  @Prop()
  lastName?: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
