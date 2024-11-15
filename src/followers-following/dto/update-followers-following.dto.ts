import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowersFollowingDto } from './create-followers-following.dto';

export class UpdateFollowersFollowingDto extends PartialType(CreateFollowersFollowingDto) {}
