# Triforce Strapi API 명세서

**Base URL:** `http://localhost:1337/api`
**Version:** 1.0.0
**Last Updated:** 2024-11-25

---

## 목차

1. [블로그 (Blog)](#1-블로그-blog)
2. [블로그 카테고리 (Blog Category)](#2-블로그-카테고리-blog-category)
3. [문의하기 (Contact)](#3-문의하기-contact)

---

## 1. 블로그 (Blog)

### 1.1 블로그 목록 조회

**GET** `/blogs`

블로그 게시글 목록을 페이지네이션과 함께 조회합니다.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `pagination[page]` | number | No | 1 | 페이지 번호 |
| `pagination[pageSize]` | number | No | 10 | 페이지당 게시글 수 |
| `sort` | string | No | `createdAt:desc` | 정렬 기준 (예: `title:asc`, `createdAt:desc`) |
| `filters[blog_categories][documentId][$eq]` | string | No | - | 카테고리 ID로 필터링 |

#### Request Example

```bash
curl -X GET "http://localhost:1337/api/blogs?pagination[page]=1&pagination[pageSize]=10&sort=createdAt:desc"
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123xyz",
      "title": "블로그 제목",
      "content": "<p>블로그 내용...</p>",
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z",
      "publishedAt": "2024-11-25T10:00:00.000Z",
      "thumbnailImage": {
        "id": 1,
        "url": "/uploads/thumbnail.jpg",
        "width": 400,
        "height": 300,
        "formats": {
          "thumbnail": { "url": "/uploads/thumbnail_thumbnail.jpg" },
          "small": { "url": "/uploads/small_thumbnail.jpg" }
        }
      },
      "blog_categories": [
        {
          "id": 1,
          "documentId": "cat123",
          "name": "카테고리명",
          "order": 1
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

---

### 1.2 블로그 상세 조회

**GET** `/blogs/:documentId`

특정 블로그 게시글의 상세 정보와 함께 관련 게시글(moreStories)을 조회합니다.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `documentId` | string | Yes | 블로그 문서 ID |

#### Request Example

```bash
curl -X GET "http://localhost:1337/api/blogs/abc123xyz"
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "abc123xyz",
    "title": "블로그 제목",
    "content": "<p>블로그 상세 내용...</p>",
    "createdAt": "2024-11-25T10:00:00.000Z",
    "updatedAt": "2024-11-25T10:00:00.000Z",
    "publishedAt": "2024-11-25T10:00:00.000Z",
    "thumbnailImage": {
      "id": 1,
      "url": "/uploads/thumbnail.jpg",
      "width": 400,
      "height": 300
    },
    "featuredImage": {
      "id": 2,
      "url": "/uploads/featured.jpg",
      "width": 1200,
      "height": 630
    },
    "blog_categories": [
      {
        "id": 1,
        "documentId": "cat123",
        "name": "카테고리명",
        "order": 1
      }
    ],
    "moreStories": [
      {
        "id": 2,
        "documentId": "def456xyz",
        "title": "다른 블로그 제목",
        "thumbnailImage": {
          "url": "/uploads/other_thumbnail.jpg"
        },
        "blog_categories": []
      }
    ]
  },
  "meta": {}
}
```

#### Error Responses

| Status Code | Description |
|-------------|-------------|
| 404 | Blog not found |
| 400 | Error retrieving blog |

---

## 2. 블로그 카테고리 (Blog Category)

### 2.1 카테고리 목록 조회

**GET** `/blog-categories`

블로그 카테고리 목록을 조회합니다.

#### Request Example

```bash
curl -X GET "http://localhost:1337/api/blog-categories"
```

#### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "cat123",
      "name": "Technology",
      "order": 1,
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z",
      "publishedAt": "2024-11-25T10:00:00.000Z"
    },
    {
      "id": 2,
      "documentId": "cat456",
      "name": "Business",
      "order": 2,
      "createdAt": "2024-11-25T10:00:00.000Z",
      "updatedAt": "2024-11-25T10:00:00.000Z",
      "publishedAt": "2024-11-25T10:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

---

### 2.2 카테고리 상세 조회

**GET** `/blog-categories/:documentId`

특정 카테고리의 상세 정보를 조회합니다.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `documentId` | string | Yes | 카테고리 문서 ID |

#### Request Example

```bash
curl -X GET "http://localhost:1337/api/blog-categories/cat123"
```

#### Response Example

```json
{
  "data": {
    "id": 1,
    "documentId": "cat123",
    "name": "Technology",
    "order": 1,
    "createdAt": "2024-11-25T10:00:00.000Z",
    "updatedAt": "2024-11-25T10:00:00.000Z",
    "publishedAt": "2024-11-25T10:00:00.000Z"
  },
  "meta": {}
}
```

---

## 3. 문의하기 (Contact)

### 3.1 문의 등록

**POST** `/contacts`

새로운 문의를 등록합니다. 등록 시 관리자에게 이메일 알림이 전송됩니다.

#### Request Headers

| Header | Value |
|--------|-------|
| Content-Type | application/json |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data.name` | string | Yes | 이름 (1-100자) |
| `data.email` | string | Yes | 이메일 주소 |
| `data.inquiryType` | enum | Yes | 문의 유형 |
| `data.inquiryProduct` | enum | No | 문의 제품 |
| `data.country` | string | Yes | 국가 |
| `data.company` | string | No | 회사명 |
| `data.subject` | string | Yes | 제목 (1-200자) |
| `data.message` | string | Yes | 메시지 내용 |

#### Enum Values

**inquiryType:**
- `Product Inquiry`
- `Partnership`
- `OEM / ODM`
- `Dealer distribution`
- `Other`

**inquiryProduct:**
- `Superflex (DTF Film)`
- `Prinstick (UV DTF Film)`

#### Request Example

```bash
curl -X POST "http://localhost:1337/api/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "홍길동",
      "email": "hong@example.com",
      "inquiryType": "Product Inquiry",
      "inquiryProduct": "Superflex (DTF Film)",
      "country": "South Korea",
      "company": "ABC Company",
      "subject": "제품 문의드립니다",
      "message": "안녕하세요. 제품에 대해 문의드립니다."
    }
  }'
```

#### Response Example (Success)

```json
{
  "data": {
    "id": 1,
    "documentId": "contact123",
    "name": "홍길동",
    "email": "hong@example.com",
    "inquiryType": "Product Inquiry",
    "inquiryProduct": "Superflex (DTF Film)",
    "country": "South Korea",
    "company": "ABC Company",
    "subject": "제품 문의드립니다",
    "message": "안녕하세요. 제품에 대해 문의드립니다.",
    "createdAt": "2024-11-25T10:00:00.000Z",
    "updatedAt": "2024-11-25T10:00:00.000Z"
  }
}
```

#### Error Response (Validation Failed)

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Validation failed",
    "details": {
      "errors": [
        "Name is required",
        "Valid email is required"
      ]
    }
  }
}
```

---

## 공통 사항

### 인증

| 환경 | 인증 필요 여부 |
|------|---------------|
| **개발 (development)** | 불필요 - 토큰 없이 접근 가능 |
| **운영 (production)** | 필요 - API Token 필수 |

#### 운영 환경 API 호출 시 헤더

```
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
```

#### API Token 생성 방법 (운영)

1. Strapi 관리자 패널 접속
2. **Settings** → **API Tokens** → **Create new API Token**
3. 설정:
   - **Name**: `Frontend Token`
   - **Token type**: `Custom`
   - **Permissions**:
     - Blog: `find`, `findOne`
     - Blog-category: `find`, `findOne`
     - Contact: `create`
4. 생성된 토큰을 프론트엔드 환경변수에 저장

```bash
# 프론트엔드 .env.production
STRAPI_API_TOKEN=생성된_토큰_값
```

### 에러 응답 형식

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "에러 메시지",
    "details": {}
  }
}
```

### HTTP 상태 코드

| Status Code | Description |
|-------------|-------------|
| 200 | 성공 |
| 400 | 잘못된 요청 (유효성 검사 실패 등) |
| 404 | 리소스를 찾을 수 없음 |
| 500 | 서버 내부 오류 |

---

## 스키마 정의

### Blog

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | 블로그 제목 |
| thumbnailImage | media | Yes | 썸네일 이미지 |
| featuredImage | media | Yes | 대표 이미지 |
| content | richtext (CKEditor) | No | 블로그 내용 |
| blog_categories | relation (many-to-many) | No | 카테고리 목록 |

### Blog Category

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | 카테고리명 |
| order | integer | Yes | 정렬 순서 (unique) |
| blogs | relation (many-to-many) | No | 연결된 블로그 목록 |

### Contact

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | 이름 (1-100자) |
| email | email | Yes | 이메일 |
| inquiryType | enum | Yes | 문의 유형 |
| inquiryProduct | enum | No | 문의 제품 |
| country | string | Yes | 국가 |
| company | string | No | 회사명 |
| subject | string | Yes | 제목 (1-200자) |
| message | text | Yes | 메시지 |
