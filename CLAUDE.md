# Kraftak Strapi 프로젝트

## 프로젝트 개요
Strapi v5 기반 CMS 백엔드 프로젝트

## 기술 스택
- Strapi v5
- PostgreSQL
- AWS S3 (이미지 업로드)
- Node.js

## Git 커밋 컨벤션

### 커밋 메시지 규칙
- Claude 또는 AI 관련 내용을 커밋 메시지에 포함하지 않음
- Co-Authored-By 헤더 사용하지 않음
- 간결하고 명확한 커밋 메시지 작성

### 커밋 메시지 형식
```
<type>: <subject>

<body>
```

### Type 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드, 설정 파일 수정

## 주요 설정

### 데이터베이스
- PostgreSQL 사용
- 데이터베이스명: `kraftak`

### S3 업로드
- 버킷: `kraftak`
- 리전: `ap-northeast-2`
- CDN: `https://d22tqurpl3v1pl.cloudfront.net`
- 프로바이더: `@strapi/provider-upload-aws-s3`

### 환경변수 (.env)
```
# 데이터베이스
DATABASE_CLIENT=postgres
DATABASE_HOST=<RDS_HOST>
DATABASE_PORT=5432
DATABASE_NAME=kraftak
DATABASE_USERNAME=<RDS_USERNAME>
DATABASE_PASSWORD=<RDS_PASSWORD>

# AWS S3
AWS_ACCESS_KEY_ID=<AWS_KEY>
AWS_ACCESS_SECRET=<AWS_SECRET>
AWS_REGION=ap-northeast-2
AWS_BUCKET=kraftak
AWS_ACL=public-read
```

## API 엔드포인트

개발환경에서는 인증 불필요, 운영환경에서는 Bearer 토큰 필요

| Method | Endpoint                        | 설명                        |
|--------|---------------------------------|-----------------------------|
| GET    | `/api/blogs`                    | 블로그 목록                 |
| GET    | `/api/blogs/:documentId`        | 블로그 상세 (moreStories 포함) |
| GET    | `/api/blog-categories`          | 카테고리 목록               |
| GET    | `/api/blog-categories/:documentId` | 카테고리 상세            |
| POST   | `/api/contacts`                 | 문의 생성                   |

### 블로그 목록 API (`GET /api/blogs`)

#### 쿼리 파라미터
| 파라미터   | 기본값 | 설명                                         |
|------------|--------|----------------------------------------------|
| `page`     | 1      | 페이지 번호                                  |
| `pageSize` | 10     | 페이지당 항목 수 (최대 100)                  |
| `sort`     | latest | 정렬: `latest`(최신순), `oldest`(오래된순)   |
| `category` | -      | 카테고리 documentId로 필터링                 |

#### 응답 예시
```json
{
  "data": [
    {
      "documentId": "xxx",
      "title": "블로그 제목",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "thumbnailImage": { ... },
      "categories": [
        { "documentId": "xxx", "name": "NEWS" }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 48,
    "totalPages": 5
  }
}
```

### 블로그 상세 API (`GET /api/blogs/:documentId`)

#### 응답 예시
```json
{
  "data": {
    "documentId": "xxx",
    "title": "블로그 제목",
    "content": "<p>HTML 컨텐츠</p>",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "thumbnailImage": { ... },
    "featuredImage": { ... },
    "categories": [
      { "documentId": "xxx", "name": "NEWS" }
    ],
    "moreStories": [
      { "documentId": "xxx", "title": "...", "thumbnailImage": { ... }, "categories": [...] }
    ]
  }
}
```

### 카테고리 목록 API (`GET /api/blog-categories`)

#### 응답 예시
```json
{
  "data": [
    { "documentId": "xxx", "name": "NEWS" },
    { "documentId": "xxx", "name": "STORIES" }
  ]
}
```

### 문의 생성 API (`POST /api/contacts`)

#### 요청 본문
```json
{
  "data": {
    "name": "홍길동",
    "email": "hong@example.com",
    "inquiryType": "Product Inquiry",
    "inquiryProduct": "GRIMDAL",
    "country": "South Korea",
    "company": "홍길동 주식회사",
    "subject": "제품 문의",
    "message": "문의 내용입니다."
  }
}
```

#### 필드 설명
| 필드           | 필수 | 타입   | 가능한 값                                                               |
|----------------|------|--------|-------------------------------------------------------------------------|
| name           | O    | string | 1-100자                                                                 |
| email          | O    | email  | 이메일 형식                                                             |
| inquiryType    | O    | enum   | `Product Inquiry`, `Partnership`, `OEM / ODM`, `Dealer distribution`, `Other` |
| inquiryProduct | X    | enum   | `GRIMDAL`, `CHROMA`, `EVERFLOW`, `ESSENTIAL WHITE`                      |
| country        | O    | string | -                                                                       |
| company        | X    | string | -                                                                       |
| subject        | O    | string | 1-200자                                                                 |
| message        | O    | text   | 최소 1자                                                                |

#### 성공 응답
```json
{
  "success": true,
  "message": "문의가 접수되었습니다."
}
```

#### 에러 응답
```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Validation failed",
    "details": {
      "errors": ["Valid email is required", "Inquiry type is required"]
    }
  }
}
```

## Postman 컬렉션

`postman/` 폴더에 엔드포인트별 컬렉션 파일:
- `blogs-list.postman_collection.json` - 블로그 목록 조회
- `blogs-detail.postman_collection.json` - 블로그 상세 조회
- `blog-categories-list.postman_collection.json` - 카테고리 목록 조회
- `blog-categories-detail.postman_collection.json` - 카테고리 상세 조회
- `contacts-create.postman_collection.json` - 문의 생성 (에러 케이스 포함)

### Postman 환경변수 설정

**로컬 환경 (로컬.postman_environment.json)**
- `API_ROOT`: `http://localhost:1337`
- `API_TOKEN`: 불필요 (Public 권한)

**운영 환경 (운영.postman_environment.json)**
- `API_ROOT`: `https://api.kraftak.com`
- `API_TOKEN`: API 인증 토큰

## 개발 명령어
```bash
# 개발 서버 시작
yarn develop

# 빌드
yarn build

# 프로덕션 시작
yarn start
```

## 프로젝트 구조
```
├── config/
│   ├── middlewares.ts  # CSP 설정 (S3 이미지 허용)
│   ├── plugins.ts      # S3 업로드, 이메일 플러그인 설정
│   └── database.ts     # PostgreSQL 설정
├── src/
│   ├── admin/
│   │   └── app.tsx     # 관리자 패널 한글화
│   └── api/
│       ├── blog/       # 블로그 API (커스텀 컨트롤러)
│       ├── blog-category/  # 카테고리 API (커스텀 컨트롤러)
│       └── contact/    # 문의 API (커스텀 컨트롤러)
├── postman/            # Postman 컬렉션
└── .env                # 환경변수
```

## 관리자 패널
- URL: `http://localhost:1337/admin`
- 한글화 적용됨 (프로필 > 환경설정에서 언어 변경)

## Figma 링크
- 고객사 원본: https://www.figma.com/design/KeBSdojL746wnPtkGoEswC/코드인디자인_Kraftak_견적-의뢰
- 내부 Copy (dev): https://www.figma.com/design/cNeOWHQnRZ4uTCOs5YRuAf/-만시간--Kraftak_251223-버전
- 내부 디자인: https://www.figma.com/design/PlgQ4VArnv0YRmHFtFHJS0/kraftak_내부_디자인

## AWS 정보
- AWS ID: logan.kim@manshigan.com
- S3 버킷: kraftak (ap-northeast-2)
- CDN: https://d22tqurpl3v1pl.cloudfront.net

### EC2
- 인스턴스 ID: i-09c57812466af251e
- 인스턴스 타입: t3.small
- 탄력적 IP: 13.209.112.166 (eipalloc-0fd595ab4dd4bf1f0)
- 보안 그룹: kraftak-ec2-sg (sg-0b49c75ea84a5c30f)
- 키 페어: kraftak-key

### RDS
- 인스턴스 ID: kraftak-db
- 엔진: PostgreSQL 15
- 호스트: kraftak-db.c564mi2yg7ll.ap-northeast-2.rds.amazonaws.com
- 포트: 5432
- 데이터베이스: kraftak
- 사용자: kraftak_admin
- 보안 그룹: kraftak-rds-sg (sg-0c6c8ad7145105918)

### 배포
- GitHub Actions: main 브랜치 푸시 시 자동 배포
- PM2: kraftak-prod
- Nginx: 리버스 프록시 (80 -> 1337)

### 접속 정보
- 도메인: https://api.kraftak.com
- 관리자 패널: https://api.kraftak.com/admin
- SSH: `ssh -i kraftak-key.pem ec2-user@13.209.112.166`

### 관리자 계정
- 이메일: admin@kraftak.com
- 비밀번호: Kraftak2025!

### API 토큰 (프론트엔드용)
- Access Key: `06d0597501698dc0077029d45c4c5f79813b14aba1c6d3da77cea2b6ec6aa452be6f7491d11026dae9cd2ed963e3b21d752dec8a9dd65175c5533367527b595c354c68f4365a62003e1fcc80b35ef7f5ce2c84b198f1ed8c886be49f1b8d0a73f82b610b8c68bb6496d636d50d416d19acfb40c0d295754bf203c447417e85e2`
- 사용법: `Authorization: Bearer <Access Key>` 헤더로 전송
