import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Blog } from '../blogs/blog.entity';

@Entity('likes')
@Unique(['userId', 'blogId']) // Ensure a user can only like a blog once
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.likes, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Blog, blog => blog.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blogId' })
  blog: Blog;

  @CreateDateColumn()
  createdAt: Date;

  // Foreign key columns
  userId: string;
  blogId: string;
}