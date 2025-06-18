import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { PostListView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `文章管理 | 控制面板 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListView />
    </>
  );
}
