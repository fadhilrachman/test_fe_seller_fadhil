import * as z from 'zod';

export interface ResponseSigninDto {
  data: {
    access_token: string;
  };
}
