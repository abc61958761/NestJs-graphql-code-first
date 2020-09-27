import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthorInupt {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ defaultValue: '' })
    lastName: string;
}