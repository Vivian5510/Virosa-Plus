import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { FaqsHero } from '../faqs-hero';
import { FaqsList } from '../faqs-list';
import { FaqsForm } from '../faqs-form';
import { FaqsCategory } from '../faqs-category';

// ----------------------------------------------------------------------

export function FaqsView() {
  return (
    <>
      <FaqsHero />
      <Container component="section" sx={{ pb: 10, position: 'relative', pt: { xs: 10, md: 15 } }}>
        <FaqsCategory />

        <Typography variant="h3" sx={{ my: { xs: 5, md: 10 } }}>
          Frequently asked questions
        </Typography>

        <Box
          sx={{
            gap: 10,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <FaqsList />
          <FaqsForm />
        </Box>
      </Container>
    </>
  );
}
