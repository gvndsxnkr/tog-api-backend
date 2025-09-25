import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("fvwhfkjwebkjvqwkkvwjebvk",request);
    console.log("jbk  qbefbqbqqewjjke",request.user);
    //const user = request.currentUser;
    const user = request.user?.currentUser; 
    return data ? user?.[data] : user;
  },
);

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.sub;
  },
);
