import type { IPostComment } from 'src/types/blog';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { PostCommentItem } from './post-comment-item';

// ----------------------------------------------------------------------

type Props = {
  comments?: IPostComment[];
};

export function PostCommentList({ comments = [] }: Props) {
  return (
    <>
      {comments.map((comment) => {
        const hasReply = !!comment.replyComment.length;

        return (
          <Box key={comment.id}>
            <PostCommentItem
              name={comment.name}
              message={comment.message}
              postedAt={comment.postedAt}
              avatarUrl={comment.avatarUrl}
            />
            {hasReply &&
              comment.replyComment.map((reply) => {
                const userReply = comment.users.find((user) => user.id === reply.userId);

                return (
                  <PostCommentItem
                    key={reply.id}
                    name={userReply?.name || ''}
                    message={reply.message}
                    postedAt={reply.postedAt}
                    avatarUrl={userReply?.avatarUrl || ''}
                    tagUser={reply.tagUser}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}

      <Pagination
        count={8}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: { xs: 5, md: 8 },
        }}
      />
    </>
  );
}
