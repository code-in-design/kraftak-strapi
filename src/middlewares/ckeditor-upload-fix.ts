/**
 * CKEditor 업로드 인증 우회 미들웨어
 * CKEditor가 Bearer null을 보내는 버그를 수정합니다.
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // /upload 엔드포인트에서 Bearer null 문제 해결
    if (
      ctx.request.url.startsWith("/upload") &&
      ctx.request.method === "POST"
    ) {
      const authHeader = ctx.request.headers.authorization;

      // Bearer null인 경우 쿠키에서 JWT 토큰 가져오기
      if (authHeader === "Bearer null" || !authHeader) {
        const jwtToken = ctx.cookies.get("jwtToken");
        if (jwtToken) {
          ctx.request.headers.authorization = `Bearer ${jwtToken}`;
        }
      }
    }

    await next();
  };
};
