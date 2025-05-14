import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { createPagination } from '@/lib/pagination-server';
import { verifyToken } from '@/lib/verify-token-server';

export async function POST(req: NextRequest) {
  if (verifyToken(req)) {
    return Response.json(
      {
        status: 403,
        message: 'Access Denied. No token provided.'
      },
      {
        status: 403
      }
    );
  }

  const { content, thumbnail, title, category_id } = await req.json();

  try {
    const result = await prisma.article.create({
      data: {
        content,
        thumbnail,
        title,
        category_id
      }
    });

    return Response.json({
      status: 200,
      message: 'Success create article',
      result
    });
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: 'Internal server error',
        result: error
      },
      {
        status: 500
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || 1);
  const per_page = Number(searchParams.get('per_page') || 10);
  const skip = (page - 1) * per_page;

  const search = searchParams.get('search') || '';

  try {
    const total_data = await prisma.article.count();
    const pagination = createPagination({
      page: page,
      per_page: per_page,
      total_data
    });
    const result = await prisma.article.findMany({
      skip,
      take: Number(per_page),
      where: {
        title: {
          contains: search
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return Response.json({
      status: 200,
      message: 'Success get article',
      result,
      pagination
    });
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: 'Internal server error',
        result: error
      },
      {
        status: 500
      }
    );
  }
}
