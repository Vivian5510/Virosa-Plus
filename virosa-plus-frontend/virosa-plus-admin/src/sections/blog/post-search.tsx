import type { IPostItem } from 'src/types/blog';
import type { Theme, SxProps } from '@mui/material/styles';

import { useState, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useSearchPosts } from 'src/actions/blog';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  redirectPath?: (id: string) => string;
};

export function PostSearch({ sx, redirectPath }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<IPostItem | null>(null);

  const { searchResults, searchLoading } = useSearchPosts(searchQuery);

  const handleChange = useCallback(
    (post: IPostItem | null) => {
      setSelectedPost(post);
      if (post) {
        const path = redirectPath ? redirectPath(post.id) : `/dashboard/post/details?id=${post.id}`;
        router.push(path);
      }
    },
    [router, redirectPath]
  );

  const paperStyles: SxProps<Theme> = {
    width: 400,
    borderRadius: 1,
    [` .${autocompleteClasses.listbox}`]: {
      [` .${autocompleteClasses.option}`]: {
        p: 0,
        [` .${linkClasses.root}`]: {
          px: 1.5,
          py: 1,
          width: 1,
        },
      },
    },
  };

  return (
    <Autocomplete
      autoHighlight
      popupIcon={null}
      loading={searchLoading}
      options={searchResults}
      value={selectedPost}
      onChange={(event, newValue) => handleChange(newValue)}
      onInputChange={(event, newValue) => setSearchQuery(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        paper: { sx: paperStyles },
        popper: {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        },
      }}
      sx={[
        {
          width: { xs: 1, sm: 400 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="搜索文章..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {searchLoading ? (
                    <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: 1 }} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Box>
              ),
            },
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const title = post.title || '';
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        const linkPath = redirectPath
          ? redirectPath(post.id)
          : `/dashboard/post/details?id=${post.id}`;

        return (
          <li {...props} key={post.id}>
            <Link component={RouterLink} href={linkPath} color="inherit" underline="none">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  {parts.map((part, index) => (
                    <Typography
                      key={index}
                      component="span"
                      color={part.highlight ? 'primary' : 'textPrimary'}
                      sx={{
                        typography: 'body2',
                        fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                      }}
                    >
                      {part.text}
                    </Typography>
                  ))}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post.author || '未知作者'}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </li>
        );
      }}
    />
  );
}
