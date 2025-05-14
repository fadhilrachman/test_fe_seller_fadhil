import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { user_name, password, role } = await req.json();

  try {
    const checkDuplicate = await prisma.user.findFirst({
      where: {
        user_name
      }
    });
    if (checkDuplicate)
      return Response.json(
        {
          message: 'Username has been used'
        },
        {
          status: 400
        }
      );
    const result = await prisma.user.create({
      data: {
        user_name,
        password,
        role
      }
    });

    return Response.json({
      status: 200,
      message: 'Success register',
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
