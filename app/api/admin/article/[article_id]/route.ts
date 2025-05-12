import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/verify-token-server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { article_id: string } }
) {
  // if (verifyToken(req)) {
  //   return Response.json(
  //     {
  //       status: 403,
  //       message: 'Access Denied'
  //     },
  //     {
  //       status: 403
  //     }
  //   );
  // }
  const { article_id } = params;
  const { content, thumbnail, title, category } = await req.json();

  try {
    const result = await prisma.article.update({
      data: {
        content,
        thumbnail,
        title,
        category: {
          set: category.map((val: string) => ({ id: val }))
        }
      },
      where: {
        id: article_id as string
      }
    });

    return Response.json({
      status: 200,
      message: 'Success update article',
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ article_id: string }> }
) {
  // if (verifyToken(req)) {
  //   return Response.json(
  //     {
  //       status: 403,
  //       message: 'Access Denied'
  //     },
  //     {
  //       status: 403
  //     }
  //   );
  // }
  const { article_id } = await params;

  try {
    const result = await prisma.article.delete({
      where: {
        id: article_id as string
      }
    });

    return Response.json({
      status: 200,
      message: 'Success delete article',
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
