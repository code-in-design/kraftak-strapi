---
tags: [agent-rules]
---
# API 엔드포인트 (CLAUDE.md 에서 옮김, 2026-11-27)

> API 를 추가, 수정하거나 호출 경로를 확인할 때 읽는다.

개발환경에서는 인증 불필요, 운영환경에서는 Bearer 토큰 필요

| Method | Endpoint                           | 설명                           |
|--------|------------------------------------|---------------------------------|
| GET    | `/api/banner`                      | 메인 배너                       |
| GET    | `/api/blogs`                       | 블로그 목록                     |
| GET    | `/api/blogs/:documentId`           | 블로그 상세 (moreStories 포함)  |
| GET    | `/api/blog-categories`             | 카테고리 목록                   |
| GET    | `/api/blog-categories/:documentId` | 카테고리 상세                   |
| POST   | `/api/contacts`                    | 문의 생성                       |

### 메인 배너 API (`GET /api/banner`)

메인 페이지 히어로 섹션의 배너 이미지를 조회합니다. 데스크탑/태블릿/모바일 각각 다른 이미지를 설정할 수 있습니다.

#### 응답 필드
| 필드 | 필수 | 설명 |
|------|------|------|
| `backgroundImage` | O | 데스크탑용 배경 이미지 (기본) |
| `backgroundImageTablet` | X | 태블릿용 배경 이미지 |
| `backgroundImageMobile` | X | 모바일용 배경 이미지 |
| `title` | X | 배너 제목 |
| `subtitle` | X | 배너 부제목 |

#### 응답 예시
```json
{
  "data": {
    "documentId": "xxx",
    "title": "Kraftak DTF Ink",
    "subtitle": "Premium Quality",
    "backgroundImage": {
      "url": "https://d22tqurpl3v1pl.cloudfront.net/desktop.jpg",
      "width": 1920,
      "height": 1080
    },
    "backgroundImageTablet": {
      "url": "https://d22tqurpl3v1pl.cloudfront.net/tablet.jpg",
      "width": 768,
      "height": 1024
    },
    "backgroundImageMobile": {
      "url": "https://d22tqurpl3v1pl.cloudfront.net/mobile.jpg",
      "width": 375,
      "height": 667
    }
  }
}
```

#### 프론트엔드 사용 가이드
```typescript
// 반응형 이미지 선택 로직 예시
const getBackgroundImage = (banner: Banner, screenWidth: number) => {
  if (screenWidth <= 768 && banner.backgroundImageMobile) {
    return banner.backgroundImageMobile.url;
  }
  if (screenWidth <= 1024 && banner.backgroundImageTablet) {
    return banner.backgroundImageTablet.url;
  }
  return banner.backgroundImage.url; // 기본값: 데스크탑
};
```

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
- `banner.postman_collection.json` - 메인 배너 조회
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
