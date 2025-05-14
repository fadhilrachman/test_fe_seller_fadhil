import { CategoryType } from './category.type';

export interface ArticleType {
  id: string;
  title: string;
  thumbnail: string;
  created_at?: Date;
  category: CategoryType;
  content: string;
}

export interface CreateArticleType {
  title: string;
  thumbnail: string;
  category_id: CategoryType;
  content: string;
}
