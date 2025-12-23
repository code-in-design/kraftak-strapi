export default ({ env }) => ({
  // CKEditor 플러그인 설정
  ckeditor5: {
    enabled: true,
    config: {
      plugin: {
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/simple-upload-adapter.html
        strapiUpload: {
          enabled: true,
        },
      },
    },
  },
  email: {
    // 이메일 플러그인 설정
    config: {
      provider: "nodemailer", // Nodemailer를 이메일 전송에 사용할 프로바이더로 설정
      providerOptions: {
        // Nodemailer에 필요한 SMTP 옵션 설정
        host: env("SMTP_HOST", "smtp.gmail.com"), // SMTP 서버 호스트 (기본값: Gmail)
        port: env("SMTP_PORT", 465), // SMTP 서버 포트 (기본값: 465 - SSL)
        secure: true, // true로 설정하면 SSL을 사용 (포트 465 사용 시)
        auth: {
          // SMTP 서버 인증 정보
          user: env("SMTP_USER"), // SMTP 사용자명 (예: 이메일 주소)
          pass: env("SMTP_PASS"), // SMTP 비밀번호 또는 앱 비밀번호
        },
      },
      settings: {
        // 기본 이메일 설정
        defaultFrom: env("SMTP_DEFAULT_FROM", "hello@example.com"), // 기본 발신자 이메일 주소
        defaultReplyTo: env("SMTP_DEFAULT_REPLY_TO", "hello@example.com"), // 기본 회신 이메일 주소
      },
    },
  },
  // s3 업로드 플러그인 설정
  upload: {
    config: {
      provider: "@strapi/provider-upload-aws-s3",
      providerOptions: {
        baseUrl: `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
        rootPath: "images",
        s3Options: {
          region: env("AWS_REGION"),
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
          },
          params: {
            Bucket: env("AWS_BUCKET"),
            ACL: env("AWS_ACL", "public-read"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      sizeLimit: 250 * 1024 * 1024, // 250MB
    },
  },
  // 스웨거 설정
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "API Documents",
      },
      "x-strapi-config": {
        // Leave empty to ignore plugins during generation
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
      servers: [
        { url: "http://localhost:1337/api", description: "local server" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  },
});
