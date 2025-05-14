import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization');
  if (!token)
    return Response.json(
      {
        status: 403,
        message: 'Access Denied. No token provided.'
      },
      {
        status: 400
      }
    );
  const tokenWithoutBearer = token.startsWith('Bearer ')
    ? token.slice(7)
    : token;

  try {
    const tokenWithoutBearer = token.startsWith('Bearer ')
      ? token.slice(7)
      : token;

    return jwt.verify(tokenWithoutBearer, 'asdasdasd', (err, decoded) => {
      if (err) {
        return Response.json(
          {
            status: 403,
            message: 'Access Denied. No token provided.'
          },
          {
            status: 400
          }
        );
      }

      return Response.json(
        {
          message: 'Success get profile',
          result: decoded
        },
        {
          status: 200
        }
      );
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
