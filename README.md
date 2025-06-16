## Getting Started

安裝

```bash
npm install
```

啟動

```bash
npm run dev
```

## Development Notes

### 主要架構

- **Next.js**: 本專案為電影資訊網站會注重SEO，因此使用Next.js App Router 做開發，
- [Next.js](https://nextjs.org/docs)

### UI and Styling

- **Heroui**: UI Framework 使用 [Heroui](https://www.heroui.com/)，因為樣式很適合且原為NextUI，跟Next.js的耦合程度應該不會太差。
- **Tailwind CSS**: 主要樣式都靠Tailwind，少部分套件使用global.css修改樣式[Tailwind CSS](https://tailwindcss.com/)
- **Material Icons**: 大部分Icon來源，並且有封裝為components使用。 [Material Icon](https://developers.google.com/fonts/docs/material_symbols?hl=zh-tw#use_in_web)

### State Management

- **Zustand**: 狀態管理使用熊熊[Zustand](https://zustand-demo.pmnd.rs/)，用到的地方為待看清單，目前的做法為將清單儲存於LocalStorage，再藉由Zustand做同步及按鈕觸發的處理。

### API

- **TMDB** :來源為[The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)，中間有使用route做防止token外洩的中介站。
- **Axios**:用來當fetcher，能用interceptors統一處理錯誤訊息及轉拋給route。[Axios](https://github.com/axios/axios)
- **SWR**: 管理data fetching，有cache及重新驗證功能，選他是想用來做Infinite Scroll。[SWR](https://swr.vercel.app/)

## Environment Variables

NEXT_PUBLIC_API_TMDB_URL: https://api.themoviedb.org/3/ （TMDB的API網址）NEXT_PUBLIC_TMDB_IMAGE_URL: https://image.tmdb.org （TMDB的圖片根網址）TMDB_ACCESS_TOKEN: TMDB 的 Access Token (https://www.themoviedb.org/settings/api)，註冊會員-> 申請API 使用權限-> 取得 API Read Access Token

## Plugins

-**react-infinite-scroll-component**: 搜尋結果無限滾動的功能使用[react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)

## 待辦

網站優化 ing
單元測試
元件說明整理
