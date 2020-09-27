import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Comment {
    @Field({ nullable: true })
    comment?: string;
    
    @Field()
    title: string;
}