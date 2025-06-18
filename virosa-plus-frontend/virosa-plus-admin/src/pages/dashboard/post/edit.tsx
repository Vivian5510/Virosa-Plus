import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';
import { useGetPost } from 'src/actions/blog';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `编辑文章 | 控制面板 - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { post } = useGetPost(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={post || undefined} />
    </>
  );
}
