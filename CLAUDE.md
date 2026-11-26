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
- 커밋 기록의 AI 흔적 금지는 전역 규칙을 따른다
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

엔드포인트 목록과 Postman 컬렉션 안내는 [`docs/agent/api-endpoints.md`](docs/agent/api-endpoints.md) 에 있다. API 를 추가, 수정하거나 호출 경로를 확인할 때 읽는다.

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
│       ├── banner/         # 메인 배너 API (singleType)
│       ├── blog/           # 블로그 API (커스텀 컨트롤러)
│       ├── blog-category/  # 카테고리 API (커스텀 컨트롤러)
│       └── contact/        # 문의 API (커스텀 컨트롤러)
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

### 관리자 계정, API 토큰

옵시디언 `01 - Projects/kraftak/AWS-인프라.md` 에 있다. 저장소에 값을 적지 않는다.

## 개발 히스토리

### 2025.12.23
- AWS 인프라 구성 (EC2, RDS, S3, CloudFront)
- Strapi v5 CMS 초기 세팅
- 블로그/카테고리/문의 API 구현
- 도메인 연결 및 SSL 설정
- 문의 접수 시 관리자 이메일 알림 기능
- GitHub Actions CI/CD 파이프라인 구축

### 2025.12.24
- **메인 배너 API 추가**
  - Banner singleType 컨텐츠 타입 생성
  - `GET /api/banner` 엔드포인트
  - Public 권한 설정 (토큰 없이 접근 가능)
  - Postman 컬렉션 추가 (`banner.postman_collection.json`)
