import * as bcrypt from 'bcrypt';
import { Context } from 'koa';
import {
  description,
  request,
  responsesAll,
  summary,
  tagsAll
} from 'koa-swagger-decorator';
import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';

@responsesAll({
  200: { description: 'success' },
  400: { description: 'bad request' },
  401: { description: 'unauthorized, missing/wrong jwt token' },
})
@tagsAll(['Authentication'])
export default class AuthController {
  @request('get', '/')
  @summary('Authentication Controller')
  @description('A simple auth controller to validate valid user.')
  public static async login(ctx: Context): Promise<void> {
    const loggingUser = ctx.request.body as User;
    if (!loggingUser) {
      ctx.status = 400;
      ctx.body = 'BAD REQUEST';
      return;
    }
    // get a user repository to perform operations with user
    const userRepository: Repository<User> = getManager().getRepository(User);

    const user: User | undefined = await userRepository.findOne({
      email: loggingUser.email,
    });

    if (user) {
      if (await bcrypt.compare(loggingUser.password, user.password)) {
        // return OK status code and loaded user object
        ctx.status = 200;
        ctx.body = user;
        return;
      }
    }

    ctx.status = 401;
    ctx.body = 'UNAUTHORIZED';
  }
}
