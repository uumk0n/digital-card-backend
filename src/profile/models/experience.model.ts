import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  role: string;

  @Field()
  location: string;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  description: string;

  @Field(() => [String])
  achievements: string[];

  @Field(() => [String])
  stack: string[];
}
