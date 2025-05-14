import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { user_name, password } = await req.json();

  try {
    const checkCredential = await prisma.user.findUnique({
      where: {
        user_name
      }
    });

    if (!checkCredential)
      return Response.json(
        { status: 401, message: 'Check your email & password' },
        { status: 401 }
      );
    const checkPassword = checkCredential.password == password;

    if (!checkPassword)
      return Response.json(
        { status: 401, message: 'Check your email & password' },
        { status: 401 }
      );

    const token = await jwt.sign(checkCredential, 'asdasdasd', {
      expiresIn: '28d'
    });

    return Response.json(
      {
        message: 'Success login',
        result: {
          ...checkCredential,
          token
        }
      },
      {
        status: 201
      }
    );
  } catch (error) {
    console.log({ error });

    return Response.json(
      {
        status: 500,
        message: 'Internal server error'
      },
      {
        status: 500
      }
    );
  }
}
