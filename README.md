# Wanted PRE-ONBOARDING CHALLENGE 사전과제

> 🤞 달성하기 : 
> 1. React를 기반으로 컴포넌트와 코드 구조를 설계하며, 비즈니스 로직과 마크업, 인터랙션을 위한 로직 등을 구분하고 분리하여 결합도에 따라 코드를 분리하고 결합하는 과정에 익숙해진다.
> 2. 추상화를 통해 복잡한 코드 구조를 읽기 쉽게 만든다.

## 1-1 과제 환경 설정

- 반드시 Vite, React Router v6, React 함수 컴포넌트(Hooks) 기반으로 개발
- 과제 수행에 SSR이 필요하다고 판단될 경우, vite와 호환되는 Remix 사용

## 1-2 구현 조건

### Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

### 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 db/db.json이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.
2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)
3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

---

## 구현 결과

### 환경

- vite@latest react-ts 템플릿 기반으로 코드 작성
- 아래 패키지 의존성과 같이 구현을 위해 `react`(&`react-dom`)^18, `react-router`(&`react-router-dom`)^6, `react-query`^5 활용

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.59.19",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router": "^6.27.0",
    "react-router-dom": "^6.27.0"
  },
}
```

### 라우트

```md
/ (Home)
 ┣ /login
 ┣ /signup
 ┗ /list (Todos)
   ┗ /:id (상세페이지)
```

### CRUD 구현

- GET

```md
----------------------- tanstack/react-query -----------------------
fetch 함수 (Request) --> API Response (Promise) --> 가져온 data 사용 (from useQuery)
```

- POST / PUT / DELETE

```md
----------------------- tanstack/react-query -----------------------
[mutate 함수 사용 (from useMutation)] --> fetch 함수 (Request) --> API Response (Promise)
```

### 수정된 내용 실시간 반영 및 낙관적 업데이트

_진행 중_

