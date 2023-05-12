import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserInterface {
  ID: number;
  Email: string;
  FirstName: string;
  LastName: string;
}

export const User = createParamDecorator(
  (
    data: 'ID' | 'Email' | 'FirstName' | 'LastName' | undefined,
    context: ExecutionContext,
  ): UserInterface | string | number => {
    const req = context.switchToHttp().getRequest();
    const user = req.user as UserInterface;
    if (data) {
      return user[data];
    }
    return data;
  },
);
