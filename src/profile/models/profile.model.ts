import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Skill } from './skill.model';
import { Experience } from './experience.model';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  fullName: string;

  @Field()
  title: string;

  @Field()
  location: string;

  @Field()
  citizenship: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  telegram: string;

  @Field()
  englishLevel: string;

  @Field()
  summary: string;

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => [Experience])
  experiences: Experience[];
}
