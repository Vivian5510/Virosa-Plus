import { useState } from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Editor } from 'src/components/editor';
import { Markdown } from 'src/components/markdown';

import { ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const defaultValue = `
<h4>This is Heading 4</h4>
<code>This is code</code>

<pre><code class="language-javascript">for (var i=1; i &#x3C;= 20; i++) {
  if (i % 15 == 0)
    return "FizzBuzz"
  else if (i % 3 == 0)
    return "Fizz"
  else if (i % 5 == 0)
    return "Buzz"
  else
    return i
  }</code></pre>
`;

// ----------------------------------------------------------------------

export function EditorView() {
  const [checked, setChecked] = useState(true);

  const [content, setContent] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <ComponentLayout
      heroProps={{
        heading: 'Editor',
        moreLinks: ['https://tiptap.dev/docs/editor/introduction'],
      }}
      containerProps={{ maxWidth: false }}
    >
      <FormControlLabel
        control={<Switch name="fullItem" checked={checked} onChange={handleChange} />}
        label="Full item"
        sx={{ mb: 3 }}
      />

      <Box
        sx={{
          rowGap: 5,
          columnGap: 3,
          display: 'grid',
          alignItems: 'flex-start',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' },
        }}
      >
        <Editor
          fullItem={checked}
          value={content}
          onChange={(value) => setContent(value)}
          sx={{ maxHeight: 720 }}
        />

        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            overflowX: 'auto',
            bgcolor: 'background.neutral',
          }}
        >
          <Typography variant="h6">Preview</Typography>
          <Markdown children={content} />
        </Box>
      </Box>
    </ComponentLayout>
  );
}
