import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        // Note: 这里我们可以通过 ctx 获取到当前请求的上下文信息，例如请求对象、响应对象等
        const request = ctx.switchToHttp().getRequest();
        // 这里我们假设用户信息存储在请求对象的 user 属性中，实际情况可能需要根据你的应用逻辑进行调整
        return request.user;
    }
)