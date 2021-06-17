import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';

@tagsAll(['Authentication'])
export default class AuthController {
  @request('get', '/')
  @summary('Authentication Controller')
  @description('A simple auth controller to validate valid user.')
  public static async login(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!';
  }
}
