# 멋사 11월 2일 React 세션 과제

VS Code에서 작업하던 `React_멋사_1102` 프로젝트를 바탕으로, 세션의 카페 메뉴 실습에 **전체 찜 해제 버튼**을 추가했습니다.

## 구현 내용

- React Router로 전체 메뉴, 음료 상세, 찜 목록 페이지 이동
- `useParams()`로 상세 페이지의 음료 ID 읽기
- Zustand로 헤더, 상세 페이지, 찜 목록의 찜 상태 공유
- 찜 목록의 전체 찜 해제 버튼으로 모든 찜 초기화
- 찜한 메뉴가 없으면 버튼 비활성화 및 빈 목록 안내

### 과제에서 추가한 코드

```js
// src/stores/useFavoriteStore.js
clearFavorites: () => set({ favoriteIds: [] }),
```

```jsx
// src/pages/FavoritesPage.jsx
const clearFavorites = useFavoriteStore((state) => state.clearFavorites);

<button
  className="clear-favorites"
  type="button"
  onClick={clearFavorites}
  disabled={favoriteDrinks.length === 0}
>
  전체 찜 해제
</button>
```

`favoriteIds`를 빈 배열로 바꾸면 같은 store를 구독하는 헤더의 찜 개수와 상세 페이지의 찜 버튼도 함께 갱신됩니다. 세션 예제처럼 새로고침하면 찜 상태는 초기화됩니다.

## 제출 스크린샷

기존 VS Code 프로젝트를 실행하고 실제로 메뉴 3개를 찜한 뒤 촬영했습니다.

### 1. 전체 찜 해제 버튼 생성 화면

![찜한 메뉴 3개와 전체 찜 해제 버튼](docs/screenshots/01-before-clear.png)

### 2. 전체 찜 해제 성공 화면

![전체 해제 후 빈 목록, 헤더 개수 0, 비활성화된 버튼](docs/screenshots/02-after-clear.png)

## 실행 방법

```bash
git clone https://github.com/brian180099/likelion-react-favorites.git
cd likelion-react-favorites
npm ci
npm run dev
```

터미널에 표시되는 로컬 주소로 접속합니다. Node.js 24 환경에서 검증했습니다.

| 경로 | 화면 |
| --- | --- |
| `/` | 전체 메뉴 |
| `/drinks/:drinkId` | 음료 상세 및 개별 찜 / 해제 |
| `/favorites` | 찜한 메뉴 및 전체 찜 해제 |

## 검증

- `npm run build` 통과
- `npm run lint` 통과
- 실제 브라우저에서 메뉴 3개 찜 → 전체 해제 → 목록 비움 및 헤더 0 확인
- 전체 해제 후 상세 화면의 찜 상태 초기화 확인
- 개별 찜 / 해제 동작 확인

## 파일 구조

```text
src/
├── main.jsx
├── App.jsx
├── styles.css
├── data/drinks.js
├── pages/
│   ├── HomePage.jsx
│   ├── DrinkDetailPage.jsx
│   └── FavoritesPage.jsx
└── stores/useFavoriteStore.js
docs/screenshots/
├── 01-before-clear.png
└── 02-after-clear.png
```
