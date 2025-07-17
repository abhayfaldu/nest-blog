import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './like.entity';
import { Blog } from '../blogs/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Blog])],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}