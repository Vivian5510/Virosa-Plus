import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';
import { useGetPost } from 'src/actions/blog';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `文章详情 | 控制面板 - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { post, postLoading, postError } = useGetPost(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsView post={post || undefined} loading={postLoading} error={postError} />
    </>
  );
}
