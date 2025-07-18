import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto, authorId: string): Promise<Blog> {
    const blog = this.blogsRepository.create({
      ...createBlogDto,
      authorId,
    });

    return await this.blogsRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogsRepository.find({
      where: { isPublished: true },
      relations: ['likes', 'comments'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({
      where: { id, isPublished: true },
      relations: ['likes', 'comments'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async findByAuthor(authorId: string): Promise<Blog[]> {
    return await this.blogsRepository.find({
      where: { authorId },
      relations: ['likes', 'comments'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, userId: string): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user is the author
    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only edit your own blogs');
    }

    await this.blogsRepository.update(id, updateBlogDto);
    return await this.blogsRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const blog = await this.blogsRepository.findOne({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Check if user is the author
    if (blog.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own blogs');
    }

    await this.blogsRepository.remove(blog);
  }
}