import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { ComponentBox } from '../../layout';

// ----------------------------------------------------------------------

type Props = {
  variant?: 'filled' | 'outlined' | 'soft';
};

export function Chips({ variant }: Props) {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box
      sx={{
        rowGap: 5,
        columnGap: 3,
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
      }}
    >
      <ComponentBox title="Colors" sx={{ gap: 1 }}>
        <Chip
          variant={variant}
          label="Default deletable"
          avatar={<Avatar>M</Avatar>}
          onDelete={handleDelete}
        />

        <Chip variant={variant} clickable label="Default clickable" avatar={<Avatar>M</Avatar>} />

        <Chip
          variant={variant}
          label="Primary deletable"
          avatar={<Avatar alt="Natacha" src={_mock.image.avatar(1)} />}
          color="primary"
          onDelete={handleDelete}
        />

        <Chip
          variant={variant}
          clickable
          label="Primary clickable"
          avatar={<Avatar alt="Natacha" src={_mock.image.avatar(1)} />}
          color="primary"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Secondary deletable"
          onDelete={handleDelete}
          color="secondary"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Secondary clickable"
          color="secondary"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Info deletable"
          onDelete={handleDelete}
          color="info"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Info clickable"
          color="info"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Success deletable"
          onDelete={handleDelete}
          color="success"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Success clickable"
          color="success"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Warning deletable"
          onDelete={handleDelete}
          color="warning"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Warning clickable"
          color="warning"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Error deletable"
          onDelete={handleDelete}
          color="error"
        />

        <Chip
          clickable
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Error clickable"
          color="error"
        />
      </ComponentBox>

      <Stack spacing={5}>
        <ComponentBox title="Custom icon" sx={{ gap: 1 }}>
          <Chip
            variant={variant}
            icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
            label="Custom icon"
            onDelete={handleDelete}
            deleteIcon={<Iconify width={24} icon="eva:checkmark-fill" />}
          />

          <Chip
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Custom icon"
            onDelete={handleDelete}
            deleteIcon={<Iconify width={24} icon="eva:checkmark-fill" />}
            color="info"
          />
        </ComponentBox>

        <ComponentBox title="Disabled" sx={{ gap: 1 }}>
          <Chip
            disabled
            variant={variant}
            icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
            label="Disabled"
            onDelete={handleDelete}
          />

          <Chip
            disabled
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Disabled"
            onDelete={handleDelete}
            color="info"
          />
        </ComponentBox>

        <ComponentBox title="Sizes" sx={{ gap: 1 }}>
          <Chip
            variant={variant}
            icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
            label="Normal"
            onDelete={handleDelete}
            color="info"
          />

          <Chip
            variant={variant}
            size="small"
            avatar={<Avatar>M</Avatar>}
            label="Small"
            onDelete={handleDelete}
            color="info"
          />
        </ComponentBox>
      </Stack>
    </Box>
  );
}
