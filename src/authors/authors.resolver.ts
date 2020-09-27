import { Resolver, Query, ID, Args, Subscription, Mutation } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';

import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';
import { Comment } from './models/comment.model';

const pubSub = new PubSub();

@Resolver(of => Author)
export class AuthorsResolver {
    constructor(
        private authorsService: AuthorsService
    ) {}
    
    @Query(() => Author)
    async author(@Args('id', { type: () => ID }) id: string) {
        const author = await this.authorsService.findOneById(id);
        author.id = author._id;
        return author;
    }

    @Mutation(() => Author)
    async createAuthor(
        @Args( 'firstName', { nullable: true }) firstName?: string,
        @Args( 'lastName', { defaultValue: '' }) lastName?: string
    ) {
        const author = await this.authorsService.createAuthor({ firstName, lastName });
        author.id = author._id;
        return author;
    }

    @Mutation(returns => Comment) 
    addComment(
            @Args('comment', { type: () => String}) comment: string,
            @Args('title', { type: () => String}) title: string
        ) {
        pubSub.publish('commentAdded',  { commentAdded: { comment, title } });
        return { comment };
    }

    @Subscription(returns => Comment, {
        name: 'commentAdded',
        filter: (payload, variables) => {
            return payload.commentAdded.title === variables.title
        }
    })
    addCommentHandler(@Args('title') title ?: string) {
        return pubSub.asyncIterator('commentAdded');
    }
}