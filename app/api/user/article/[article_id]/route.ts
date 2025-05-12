import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/verify-token-server';

export async function GET(
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
    const result = await prisma.article.findUnique({
      where: {
        id: article_id as string
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
