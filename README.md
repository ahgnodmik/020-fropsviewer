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
- 배포: Vercel (클라이언트 전용)

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

## 배포 (Vercel)

프로젝트를 Vercel에 연결한 뒤 배포하면 됩니다. 별도 서버/API 없이 정적 빌드로 동작합니다.

## 광고 (Google AdSense)

- **위치**: PC 좌우 사이드바 300×250, 모바일 하단 고정 320×50. 뷰어 영역 내부에는 광고 없음.
- **승인 전**: `src/components/AdSlot.tsx`가 공백 플레이스홀더로 영역만 확보.
- **승인 후**: `index.html`에 AdSense 스크립트 추가 후, 각 슬롯에 `<ins class="adsbygoogle" data-ad-client="ca-pub-xxx" data-ad-slot="xxx">` 등으로 채우면 됩니다.
