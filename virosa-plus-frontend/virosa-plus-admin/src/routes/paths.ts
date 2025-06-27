import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

// 创建一个空函数来处理所有详情页和编辑页链接
const dummyPath = (id: string) => '#';

export const paths = {
  comingSoon: '/coming-soon',
  // 以下路径已删除对应页面，但保留定义以防引用
  maintenance: '/maintenance', 
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us', 
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneStore: 'https://mui.com/store/items/zone-landing-page/',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figmaUrl: 'https://www.figma.com/design/cAPz4pYPtQEXivqe11EcDE/%5BPreview%5D-Minimal-Web.v6.0.0',
  // 临时添加，解决引用问题
  product: {
    root: '/',
    checkout: '/checkout',
    demo: {
      details: '/'
    }
  },
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    blank: `${ROOTS.DASHBOARD}/blank`,
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/post/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/post/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/post/${MOCK_ID}/edit`,
      },
    },
    directory: {
      root: `${ROOTS.DASHBOARD}/directory`,
      tree: `${ROOTS.DASHBOARD}/directory/tree`,
      details: (id: string) => `${ROOTS.DASHBOARD}/directory/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/directory/${id}/edit`,
    },
  },
};
