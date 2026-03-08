# PDF 뷰어

웹에서 PDF를 업로드하고 즉시 열람할 수 있는 가볍고 안전한 온라인 PDF 뷰어입니다.

- **심플 · 빠르고 · 안전하게**
- 파일은 브라우저 메모리에서만 처리되며, 서버에 저장되지 않습니다.
- 탭/브라우저 종료 시 자동 소멸.

## 기능 (MVP)

- PDF 업로드: 드래그 앤 드롭 / 버튼 (최대 50MB, .pdf)
- 뷰어: 페이지 이동, 확대/축소, 페이지 번호 표시
- 다크 모드, 반응형

## 기술 스택

- React, TypeScript, Vite
- Tailwind CSS
- PDF.js (Mozilla)
- 배포: GitHub Pages (또는 Vercel)

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 배포 (GitHub Pages)

1. **한 번만 설정**: 저장소 **Settings → Pages** 에서 **Build and deployment → Source** 를 **GitHub Actions** 로 선택합니다.
2. `main` 브랜치에 푸시하면 자동으로 빌드·배포됩니다.
3. 배포된 주소: `https://<사용자명>.github.io/020-fropsviewer/`

(Vercel 등 다른 호스팅을 쓰려면 `vite.config.ts`의 `base`를 `/`로 바꾸면 됩니다.)

## 광고 (Google AdSense)

- **위치**: PC 좌우 사이드바 300×250, 모바일 하단 고정 320×50. 뷰어 영역 내부에는 광고 없음.
- **승인 전**: `src/components/AdSlot.tsx`가 공백 플레이스홀더로 영역만 확보.
- **승인 후**: `index.html`에 AdSense 스크립트 추가 후, 각 슬롯에 `<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="xxx">` 등으로 채우면 됩니다.
