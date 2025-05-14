import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/verify-token-server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { article_id: string } }
) {
  if (verifyToken(req)) {
    return NextResponse.json(
      {
        status: 403,
        message: 'Access Denied'
      },
      {
        status: 403
      }
    );
  }
  const { article_id } = await params;
  const { content, thumbnail, title, category_id } = await req.json();

  try {
    const result = await prisma.article.update({
      data: {
        content,
        thumbnail,
        title,
        category_id
      },
      where: {
        id: article_id as string
      }
    });

    return NextResponse.json({
      status: 200,
      message: 'Success update article',
      result
    });
  } catch (error) {
    return NextResponse.json(
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

export async function GET(
  req: NextRequest,
  { params }: { params: { article_id: string } }
) {
  if (verifyToken(req)) {
    return NextResponse.json(
      {
        status: 403,
        message: 'Access Denied'
      },
      {
        status: 403
      }
    );
  }
  const { article_id } = await params;

  try {
    const result = await prisma.article.findUnique({
      where: {
        id: article_id as string
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      status: 200,
      message: 'Success get article',
      result
    });
  } catch (error) {
    return NextResponse.json(
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
  { params }: { params: { article_id: string } }
) {
  if (verifyToken(req)) {
    return NextResponse.json(
      {
        status: 403,
        message: 'Access Denied'
      },
      {
        status: 403
      }
    );
  }
  const { article_id } = await params;

  try {
    const result = await prisma.article.delete({
      where: {
        id: article_id as string
      }
    });

    return NextResponse.json({
      status: 200,
      message: 'Success delete article',
      result
    });
  } catch (error) {
    return NextResponse.json(
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
