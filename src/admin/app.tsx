import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: ["ko"],
    translations: {
      ko: {
        // =====================
        // 사이드바 메뉴 (Left Menu)
        // =====================
        "app.components.LeftMenu.navbrand.title": "대시보드",
        "app.components.LeftMenu.navbrand.workplace": "관리자 패널",
        "content-manager.plugin.name": "콘텐츠 관리자",
        "Content Manager": "콘텐츠 관리자",
        "upload.plugin.name": "미디어 라이브러리",
        "Media Library": "미디어 라이브러리",
        "global.content-manager": "콘텐츠 관리자",
        "global.plugins.content-manager": "콘텐츠 관리자",
        "global.plugins.upload": "미디어 라이브러리",
        "app.components.LeftMenu.collection-types": "컬렉션 타입",
        "app.components.LeftMenu.single-types": "싱글 타입",
        "Collection Types": "컬렉션 타입",
        "Single Types": "싱글 타입",

        // =====================
        // 헤더 & 네비게이션
        // =====================
        "app.components.HomePage.welcome": "환영합니다",
        "app.components.HomePage.welcome.again": "다시 오신 것을 환영합니다",
        "HomePage.head.title": "홈페이지",
        "app.components.BlockLink.blog": "블로그 보기",
        "app.components.BlockLink.documentation": "문서 읽기",
        "app.components.BlockLink.tutorial": "튜토리얼 보기",
        "app.components.BlockLink.code": "코드 예제 보기",

        // =====================
        // 공통 버튼 & 액션
        // =====================
        Save: "저장",
        Cancel: "취소",
        Confirm: "확인",
        Delete: "삭제",
        Edit: "편집",
        Create: "생성",
        Publish: "게시",
        Unpublish: "게시 취소",
        Submit: "제출",
        Reset: "초기화",
        Close: "닫기",
        Back: "뒤로",
        Next: "다음",
        Previous: "이전",
        Add: "추가",
        Remove: "제거",
        Search: "검색",
        Filter: "필터",
        Clear: "지우기",
        Apply: "적용",
        Duplicate: "복제",
        Clone: "복제",
        Preview: "미리보기",
        Download: "다운로드",
        Upload: "업로드",
        Import: "가져오기",
        Export: "내보내기",
        Refresh: "새로고침",
        Loading: "로딩 중...",
        "Loading...": "로딩 중...",

        // =====================
        // 상태 & 알림
        // =====================
        Published: "게시됨",
        Draft: "임시저장",
        Modified: "수정됨",
        Saved: "저장됨",
        Success: "성공",
        Error: "오류",
        Warning: "경고",
        Info: "정보",
        "notification.error": "오류가 발생했습니다",
        "notification.success": "성공적으로 완료되었습니다",
        "notification.success.saved": "저장되었습니다",
        "notification.success.created": "생성되었습니다",
        "notification.success.deleted": "삭제되었습니다",
        "notification.warning": "경고",

        // =====================
        // 테이블 & 목록
        // =====================
        "app.component.table.empty": "데이터가 없습니다",
        "components.TableEmpty.withSearch": "검색 결과가 없습니다",
        "components.TableEmpty.withFilters": "필터 조건에 맞는 결과가 없습니다",
        "app.component.search.placeholder": "검색...",
        "app.utils.placeholder.defaultSearch": "검색...",
        Actions: "작업",
        Name: "이름",
        Status: "상태",
        Date: "날짜",
        Type: "타입",
        Size: "크기",
        Created: "생성일",
        Updated: "수정일",
        "Created at": "생성일",
        "Updated at": "수정일",
        ID: "ID",
        "Entries found": "개 항목",
        "No entries found": "항목이 없습니다",
        "entries found": "개 항목 발견",

        // =====================
        // 콘텐츠 매니저
        // =====================
        "content-manager.header.name": "콘텐츠 관리자",
        "content-manager.containers.List.draft": "임시저장",
        "content-manager.containers.List.published": "게시됨",
        "content-manager.popUpWarning.warning.publish-question":
          "이 항목을 게시하시겠습니까?",
        "content-manager.popUpWarning.warning.unpublish":
          "게시를 취소하시겠습니까?",
        "content-manager.form.Input.hint.character.unit": "자",
        "content-manager.components.DraggableCard.move.field": "필드 이동",
        "content-manager.components.DraggableCard.edit.field": "필드 편집",
        "content-manager.components.DraggableCard.delete.field": "필드 삭제",
        "content-manager.containers.Edit.information": "정보",
        "content-manager.containers.Edit.information.lastUpdate": "마지막 업데이트",
        "content-manager.containers.Edit.information.by": "작성자",
        "content-manager.containers.Edit.information.created": "생성일",
        "content-manager.containers.Edit.information.draftVersion": "임시저장 버전",
        "content-manager.containers.Edit.information.publishedVersion": "게시된 버전",
        "content-manager.success.record.save": "저장되었습니다",
        "content-manager.success.record.publish": "게시되었습니다",
        "content-manager.success.record.unpublish": "게시가 취소되었습니다",
        "content-manager.success.record.delete": "삭제되었습니다",
        "content-manager.containers.Edit.delete-entry": "항목 삭제",
        "content-manager.popUpWarning.warning.has-draft-relations.title": "확인",
        "content-manager.popUpWarning.warning.has-draft-relations.message":
          "관련된 임시저장 항목이 있습니다. 계속하시겠습니까?",

        // =====================
        // 미디어 라이브러리
        // =====================
        "upload.header.actions.upload-assets": "파일 업로드",
        "upload.modal.header.select-files": "파일 선택",
        "upload.header.actions.add-assets": "새 파일 추가",
        "upload.header.actions.folder": "폴더 추가",
        "upload.asset.dialog.title": "세부 정보",
        "upload.asset.dialog.edit": "편집",
        "upload.asset.dialog.delete": "삭제",
        "upload.root.label": "미디어 라이브러리",
        "upload.root.title": "미디어 라이브러리",
        "upload.folders.title": "폴더",
        "upload.assets.title": "파일",
        "upload.assets.empty": "파일이 없습니다",
        "upload.assets.empty.upload": "파일을 업로드하세요",
        "upload.asset.list.empty": "파일이 없습니다",
        "upload.content.browse": "찾아보기",
        "upload.content.drag-and-drop": "여기에 파일을 드래그 앤 드롭하거나",
        "upload.modal.nav.browse": "찾아보기",
        "upload.modal.nav.upload": "업로드",
        "upload.modal.nav.url": "URL에서",
        "upload.modal.file-dialog.title": "파일 업로드",
        "upload.modal.replace": "파일 교체",
        "upload.modal.edit.title": "세부 정보 편집",
        "upload.form.caption.placeholder": "캡션 입력",
        "upload.form.alt.placeholder": "대체 텍스트 입력",
        "upload.list.empty": "업로드된 파일이 없습니다",
        "upload.input.label": "파일 선택",
        Files: "파일",
        Folders: "폴더",
        "All files": "모든 파일",
        Images: "이미지",
        Videos: "비디오",
        Audios: "오디오",
        Documents: "문서",

        // =====================
        // 설정 (Settings)
        // =====================
        Settings: "설정",
        "Settings.application.title": "설정",
        "Settings.application.strapi-version": "Strapi 버전",
        "Settings.application.node-version": "Node 버전",
        "Settings.application.edition-title": "현재 플랜",
        "Settings.global": "전역 설정",
        "global.settings": "설정",
        "Settings.permissions": "권한",
        "Settings.permissions.menu.link.roles.label": "역할",
        "Settings.permissions.menu.link.users.label": "사용자",
        "Settings.permissions.users.label": "사용자",
        "Settings.permissions.roles.label": "역할",
        Configuration: "구성",
        Overview: "개요",
        Administration: "관리",
        Global: "전역",
        Plugins: "플러그인",

        // =====================
        // API 토큰
        // =====================
        "Settings.apiTokens": "API 토큰",
        "Settings.apiTokens.title": "API 토큰",
        "Settings.apiTokens.create": "새 API 토큰 생성",
        "Settings.apiTokens.addNewToken": "새 API 토큰 추가",
        "Settings.apiTokens.ListView.headers.name": "이름",
        "Settings.apiTokens.ListView.headers.description": "설명",
        "Settings.apiTokens.ListView.headers.createdAt": "생성일",
        "Settings.apiTokens.ListView.headers.lastUsedAt": "마지막 사용",
        "Settings.apiTokens.types.read-only": "읽기 전용",
        "Settings.apiTokens.types.full-access": "전체 접근",
        "Settings.apiTokens.types.custom": "사용자 정의",
        "Settings.tokens.copy.editTitle": "토큰 정보",
        "Settings.tokens.copy.editMessage":
          "보안상의 이유로 토큰은 한 번만 표시됩니다.",
        "Settings.tokens.regenerate": "토큰 재생성",
        "Settings.tokens.revoke": "토큰 폐지",
        "API Tokens": "API 토큰",
        "Transfer Tokens": "전송 토큰",

        // =====================
        // 사용자 & 권한
        // =====================
        "users-permissions.plugin.name": "사용자 및 권한",
        Users: "사용자",
        Roles: "역할",
        Permissions: "권한",
        "Settings.roles.form.title": "역할 세부 정보",
        "Settings.roles.form.description": "역할 이름 및 설명",
        "Settings.permissions.users.create": "사용자 초대",
        "Settings.permissions.users.listview.header.user": "사용자",
        "Settings.permissions.users.listview.header.email": "이메일",
        "Settings.permissions.users.listview.header.firstname": "이름",
        "Settings.permissions.users.listview.header.lastname": "성",
        "Settings.permissions.users.listview.header.roles": "역할",
        "Settings.permissions.users.listview.header.isActive": "활성 상태",
        Active: "활성",
        Inactive: "비활성",
        Email: "이메일",
        Password: "비밀번호",
        Username: "사용자명",
        Firstname: "이름",
        Lastname: "성",
        "First name": "이름",
        "Last name": "성",

        // =====================
        // 폼 & 입력
        // =====================
        Required: "필수",
        Optional: "선택",
        "This field is required": "이 필드는 필수입니다",
        "Invalid value": "잘못된 값입니다",
        "This value is too short": "값이 너무 짧습니다",
        "This value is too long": "값이 너무 깁니다",
        "app.utils.errors.required.field": "이 필드는 필수입니다",
        "components.Input.error.validation.minLength": "값이 너무 짧습니다",
        "components.Input.error.validation.maxLength": "값이 너무 깁니다",
        "components.Input.error.validation.min": "값이 너무 작습니다",
        "components.Input.error.validation.max": "값이 너무 큽니다",
        "components.Input.error.validation.email": "유효한 이메일을 입력하세요",
        "components.Input.error.validation.regex": "값이 형식과 맞지 않습니다",

        // =====================
        // 삭제 확인
        // =====================
        "app.components.ConfirmDialog.title": "확인",
        "popUpWarning.title": "확인",
        "popUpWarning.warning.cancel": "취소",
        "popUpWarning.warning.confirm": "확인",
        "components.popUpWarning.title": "확인",
        "components.popUpWarning.message":
          "이 작업을 취소할 수 없습니다. 계속하시겠습니까?",
        "app.confirm.delete": "정말 삭제하시겠습니까?",
        "app.confirm.publish": "정말 게시하시겠습니까?",
        "app.confirm.unpublish": "정말 게시를 취소하시겠습니까?",

        // =====================
        // 인증 & 로그인
        // =====================
        "Auth.form.welcome.title": "환영합니다!",
        "Auth.form.welcome.subtitle": "Strapi에 로그인하세요",
        "Auth.form.email.label": "이메일",
        "Auth.form.email.placeholder": "예: kai@doe.com",
        "Auth.form.password.label": "비밀번호",
        "Auth.form.password.placeholder": "비밀번호 입력",
        "Auth.form.rememberMe.label": "로그인 상태 유지",
        "Auth.form.button.login": "로그인",
        "Auth.form.button.login-google": "구글로 로그인",
        "Auth.form.button.forgot-password": "비밀번호 찾기",
        "Auth.form.button.go-back": "돌아가기",
        "Auth.form.button.reset-password": "비밀번호 재설정",
        "Auth.form.error.blocked": "계정이 차단되었습니다",
        "Auth.form.error.email.invalid": "유효한 이메일이 아닙니다",
        "Auth.form.error.invalid": "이메일 또는 비밀번호가 잘못되었습니다",
        "Auth.form.error.password.invalid": "잘못된 비밀번호입니다",
        "Auth.form.forgot-password.email.label": "이메일 주소를 입력하세요",
        "Auth.form.forgot-password.email.label.success":
          "비밀번호 재설정 이메일이 발송되었습니다",
        "Auth.link.ready": "로그인 준비 완료",
        "Auth.link.signin": "로그인",
        "Auth.link.forgot-password": "비밀번호를 잊으셨나요?",
        "Auth.components.Oops.title": "오류 발생",
        "Auth.components.Oops.text": "계정에 접근할 수 없습니다",
        "Auth.components.Oops.text.admin": "관리자에게 문의하세요",

        // =====================
        // 프로필
        // =====================
        Profile: "프로필",
        "Settings.profile.title": "프로필",
        "Settings.profile.form.section.experience.title": "환경설정",
        "Settings.profile.form.section.experience.interfaceLanguage":
          "인터페이스 언어",
        "Settings.profile.form.section.experience.mode": "인터페이스 모드",
        "Settings.profile.form.section.experience.mode.label": "모드",
        "Settings.profile.form.section.experience.mode.hint":
          "라이트 모드 또는 다크 모드 선택",
        Preferences: "환경설정",
        "Interface language": "인터페이스 언어",
        "Interface mode": "인터페이스 모드",
        Light: "라이트",
        Dark: "다크",

        // =====================
        // 기타
        // =====================
        "app.components.EmptyStateLayout.title": "데이터가 없습니다",
        "app.components.EmptyStateLayout.content-document":
          "여기에 콘텐츠를 추가하세요",
        Documentation: "문서",
        Tutorial: "튜토리얼",
        "Code example": "코드 예제",
        "See more on the blog": "블로그에서 더 보기",
        "Read the documentation": "문서 읽기",
        "app.links.discover-plugin": "플러그인 둘러보기",
        "app.static.links.strapi": "Strapi 웹사이트",
        version: "버전",
        or: "또는",
        and: "그리고",
        Yes: "예",
        No: "아니오",
        All: "전체",
        None: "없음",
        Default: "기본값",
        Custom: "사용자 정의",
        Enabled: "활성화됨",
        Disabled: "비활성화됨",
        "Select all": "전체 선택",
        "Select none": "선택 해제",
        today: "오늘",
        yesterday: "어제",
        tomorrow: "내일",
        "Log out": "로그아웃",
        Logout: "로그아웃",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    // 기본 로케일을 한국어로 설정
  },
};
