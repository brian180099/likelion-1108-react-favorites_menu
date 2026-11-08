# moment café — React Router & Zustand 과제

멋쟁이사자처럼 11월 2일 세션의 카페 메뉴 실습을 바탕으로 **전체 찜 해제 기능**을 구현한 React 프로젝트입니다.

## 과제 구현

- React Router의 `BrowserRouter`, `Routes`, `Route`, `Link`로 페이지 이동
- `useParams()`로 음료 ID를 읽어 상세 페이지 표시
- Zustand의 `favoriteIds`, `toggleFavorite`로 여러 화면의 찜 상태 공유
- 찜 목록에서 **전체 찜 해제** 클릭 시 `clearFavorites` 실행
- 전체 해제 시 목록, 헤더 개수, 상세 페이지의 찜 버튼 상태가 함께 갱신
- 찜 목록이 비어 있으면 빈 목록 안내 및 전체 해제 버튼 비활성화
- 모바일 반응형 화면과 존재하지 않는 URL / 음료 안내

### 핵심 코드

```js
// src/stores/useFavoriteStore.js
clearFavorites: () => set({ favoriteIds: [] }),
```

`FavoritesPage`에서 selector로 action을 가져와 버튼 클릭 시 실행합니다. 헤더와 상세 페이지도 같은 store를 구독하므로 상태 변경이 함께 반영됩니다. 해제 성공 안내 문구만 `useState`로 관리합니다.

세션 예제와 같이 찜 상태는 메모리에서 관리하므로 **새로고침하면 초기화**됩니다.

## 제출 스크린샷

테스트 브라우저에서 실제 메뉴 3개를 찜한 뒤 전체 해제 버튼을 클릭하여 촬영했습니다.

### 1. 전체 찜 해제 버튼이 있는 화면

찜한 메뉴 3개와 활성화된 전체 찜 해제 버튼입니다.

![전체 찜 해제 전 — 메뉴 3개와 전체 찜 해제 버튼](docs/screenshots/01-before-clear.png)

### 2. 전체 찜 해제에 성공한 화면

클릭 후 헤더와 목록 개수가 0으로 바뀌고, 성공 메시지와 빈 목록 안내가 표시됩니다.

![전체 찜 해제 후 — 개수 0과 성공 안내](docs/screenshots/02-after-clear.png)

## 실행 방법

Node.js 24 환경에서 구현 및 검증했습니다.

```bash
git clone https://github.com/brian180099/likelion-react-favorites.git
cd likelion-react-favorites
npm ci
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저로 열어 주세요.

| 경로 | 화면 |
| --- | --- |
| `/` | 전체 메뉴 |
| `/drinks/:drinkId` | 메뉴 상세 및 개별 찜 / 해제 |
| `/favorites` | 찜 목록 및 전체 찜 해제 |
| 그 외 경로 | 페이지 없음 안내 |

## 파일 구조

```text
src/
├── main.jsx
├── App.jsx
├── styles.css
├── components/
│   ├── DrinkArt.jsx
│   └── DrinkCard.jsx
├── data/drinks.js
├── pages/
│   ├── HomePage.jsx
│   ├── DrinkDetailPage.jsx
│   ├── FavoritesPage.jsx
│   └── NotFoundPage.jsx
└── stores/useFavoriteStore.js
docs/screenshots/              # 제출 스크린샷 2장
tests/favorites.spec.js        # 브라우저 동작 검증
```

음료 일러스트는 외부 이미지 의존 없이 CSS로 구성했습니다.

## 검증

```bash
npm run build
npm run lint
npx playwright install chromium
npm run test:e2e
```

Playwright 테스트 3개:

1. 세 메뉴 찜 → 전체 해제 → 목록 및 헤더 0 확인 → 상세 상태 확인 → 개별 찜 / 해제 확인
2. 존재하지 않는 음료와 경로 안내 확인
3. 모바일 화면의 찜 / 전체 해제 및 가로 넘침 여부 확인

첫 번째 테스트를 실행하면 README용 스크린샷 2장도 다시 생성됩니다.
