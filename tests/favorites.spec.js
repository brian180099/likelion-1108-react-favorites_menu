import { test, expect } from "@playwright/test";

test("전체 찜 해제가 목록, 헤더, 상세 상태를 함께 초기화한다", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  for (const title of ["아메리카노", "아이스티", "딸기라떼"]) {
    await page
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
      .click();
    await page.getByRole("button", { name: "♡ 찜하기", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "♥ 찜 해제하기" }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("link", { name: "← 전체 메뉴로 돌아가기" }).click();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /찜한 메뉴/ })
    .click();
  await expect(page.locator(".drink-card")).toHaveCount(3);
  await expect(page.getByLabel("찜한 메뉴 3개")).toBeVisible();
  await page.screenshot({
    path: "docs/screenshots/01-before-clear.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "전체 찜 해제", exact: true }).click();
  await expect(page.locator(".drink-card")).toHaveCount(0);
  await expect(page.getByLabel("찜한 메뉴 0개")).toBeVisible();
  await expect(page.getByRole("status")).toHaveText(
    "찜한 메뉴를 모두 해제했어요.",
  );
  await expect(
    page.getByRole("button", { name: "전체 찜 해제" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("heading", { name: "아직 찜한 메뉴가 없어요." }),
  ).toBeVisible();
  await page.screenshot({
    path: "docs/screenshots/02-after-clear.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "메뉴 둘러보기 →" }).click();
  await page
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", { name: "아메리카노", exact: true }),
    })
    .click();
  await expect(
    page.getByRole("button", { name: "♡ 찜하기", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "♡ 찜하기", exact: true }).click();
  await page.getByRole("button", { name: "♥ 찜 해제하기" }).click();
  await expect(page.getByLabel("찜한 메뉴 0개")).toBeVisible();
  expect(errors).toEqual([]);
});

test("잘못된 URL과 존재하지 않는 음료를 안전하게 처리한다", async ({
  page,
}) => {
  for (const path of ["/drinks/not-a-drink", "/missing-page"]) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: "페이지를 찾을 수 없어요." }),
    ).toBeVisible();
  }
});

test("모바일에서 메뉴와 전체 해제 버튼을 사용할 수 있다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/drinks/strawberry-latte");
  await page.getByRole("button", { name: "♡ 찜하기", exact: true }).click();
  await page.getByRole("link", { name: "찜한 메뉴 보러 가기 →" }).click();
  await expect(page.locator(".drink-card")).toHaveCount(1);
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.getByRole("button", { name: "전체 찜 해제", exact: true }).click();
  await expect(page.getByLabel("찜한 메뉴 0개")).toBeVisible();
});
