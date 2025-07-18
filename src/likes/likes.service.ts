import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Blog } from '../blogs/blog.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async likePost(createLikeDto: CreateLikeDto, userId: string): Promise<Like> {
    const { blogId } = createLikeDto;

    // Check if blog exists
    const blog = await this.blogsRepository.findOne({
      where: { id: blogId, isPublished: true },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user already liked this blog
    const existingLike = await this.likesRepository.findOne({
      where: { userId, blogId },
    });

    if (existingLike) {
      throw new ConflictException('You have already liked this blog');
    }

    const like = this.likesRepository.create({
      userId,
      blogId,
    });

    return await this.likesRepository.save(like);
  }

  async unlikePost(blogId: string, userId: string): Promise<void> {
    const like = await this.likesRepository.findOne({
      where: { userId, blogId },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likesRepository.remove(like);
  }

  async getBlogLikes(blogId: string): Promise<Like[]> {
    return await this.likesRepository.find({
      where: { blogId },
      order: { createdAt: 'DESC' },
    });
  }

  async getLikesCount(blogId: string): Promise<number> {
    return await this.likesRepository.count({
      where: { blogId },
    });
  }

  async hasUserLiked(blogId: string, userId: string): Promise<boolean> {
    const like = await this.likesRepository.findOne({
      where: { userId, blogId },
    });
    return !!like;
  }

  async getUserLikes(userId: string): Promise<Like[]> {
    return await this.likesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}