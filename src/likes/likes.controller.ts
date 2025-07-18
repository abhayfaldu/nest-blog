import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Request() req) {
    return this.likesService.likePost(createLikeDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('blog/:blogId')
  remove(@Param('blogId') blogId: string, @Request() req) {
    return this.likesService.unlikePost(blogId, req.user.id);
  }

  @Get('blog/:blogId')
  getBlogLikes(@Param('blogId') blogId: string) {
    return this.likesService.getBlogLikes(blogId);
  }

  @Get('blog/:blogId/count')
  getLikesCount(@Param('blogId') blogId: string) {
    return this.likesService.getLikesCount(blogId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('blog/:blogId/status')
  hasUserLiked(@Param('blogId') blogId: string, @Request() req) {
    return this.likesService.hasUserLiked(blogId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/my-likes')
  getUserLikes(@Request() req) {
    return this.likesService.getUserLikes(req.user.id);
  }
}