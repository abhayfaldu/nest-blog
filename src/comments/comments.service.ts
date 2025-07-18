import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Blog } from '../blogs/blog.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: string): Promise<Comment> {
    const { blogId, content } = createCommentDto;

    // Check if blog exists
    const blog = await this.blogsRepository.findOne({
      where: { id: blogId, isPublished: true },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const comment = this.commentsRepository.create({
      content,
      userId,
      blogId,
    });

    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async findByBlog(blogId: string): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { blogId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, userId: string): Promise<Comment> {
    const comment = await this.findOne(id);

    // Check if user is the comment author
    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    await this.commentsRepository.update(id, updateCommentDto);
    return await this.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const comment = await this.findOne(id);

    // Check if user is the comment author
    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentsRepository.remove(comment);
  }

  async getCommentsCount(blogId: string): Promise<number> {
    return await this.commentsRepository.count({
      where: { blogId },
    });
  }
}