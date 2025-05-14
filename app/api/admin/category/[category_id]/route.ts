import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/verify-token-server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  if (verifyToken(req)) {
    return Response.json(
      {
        status: 403,
        message: 'Access Denied'
      },
      {
        status: 403
      }
    );
  }
  const { category_id } = params;
  const { name } = await req.json();

  try {
    const result = await prisma.category.update({
      data: {
        name
      },
      where: {
        id: category_id as string
      }
    });

    return Response.json({
      status: 200,
      message: 'Success update category',
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
  { params }: { params: Promise<{ category_id: string }> }
) {
  if (verifyToken(req)) {
    return Response.json(
      {
        status: 403,
        message: 'Access Denied'
      },
      {
        status: 403
      }
    );
  }
  const { category_id } = await params;

  try {
    const result = await prisma.category.delete({
      where: {
        id: category_id as string
      }
    });

    return Response.json({
      status: 200,
      message: 'Success delete category',
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
