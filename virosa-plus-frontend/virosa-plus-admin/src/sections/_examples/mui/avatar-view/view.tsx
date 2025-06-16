import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { ComponentBox, ComponentLayout } from '../../layout';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const SIZES = [24, 32, 40, 56];

const VARIANTS = ['circular', 'rounded', 'square'] as const;

const STATUS = ['online', 'always', 'busy', 'offline', 'invisible'] as const;

const DEMO_COMPONENTS = [
  {
    name: 'Image',
    component: (
      <ComponentBox>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Avatar key={index} alt={_mock.fullName(index + 1)} src={_mock.image.avatar(index + 1)} />
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Letter',
    component: (
      <ComponentBox>
        {COLORS.map((color, index) => (
          <Tooltip key={color} title={color}>
            <Avatar alt={_mock.fullName(index + 3)}>
              {_mock
                .fullName(index + 3)
                .charAt(0)
                .toUpperCase()}
            </Avatar>
          </Tooltip>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Icon',
    component: (
      <ComponentBox>
        {COLORS.map((color) => (
          <Avatar key={color} color={color}>
            <Iconify icon="eva:folder-add-outline" width={24} />
          </Avatar>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Variant',
    component: (
      <ComponentBox>
        {VARIANTS.map((variant) => (
          <Avatar
            key={variant}
            variant={variant}
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          >
            <Iconify icon="eva:folder-add-outline" width={24} />
          </Avatar>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Grouped',
    component: (
      <ComponentBox sx={{ flexDirection: 'column' }}>
        {SIZES.map((size) => (
          <Tooltip key={size} title={size}>
            <AvatarGroup
              key={size}
              sx={{ [`& .${avatarGroupClasses.avatar}`]: { width: size, height: size } }}
            >
              {COLORS.map((color, index) => (
                <Avatar
                  key={color}
                  alt={_mock.fullAddress(index + 1)}
                  src={_mock.image.avatar(index + 1)}
                />
              ))}
            </AvatarGroup>
          </Tooltip>
        ))}

        <Tooltip title="compact">
          <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
            {COLORS.slice(0, 2).map((color, index) => (
              <Avatar
                key={color}
                alt={_mock.fullName(index + 1)}
                src={_mock.image.avatar(index + 1)}
              />
            ))}
          </AvatarGroup>
        </Tooltip>
      </ComponentBox>
    ),
  },
  {
    name: 'With badge',
    component: (
      <ComponentBox>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Avatar
              alt={_mock.fullName(7)}
              src={_mock.image.avatar(7)}
              sx={[
                (theme) => ({
                  p: 0,
                  width: 24,
                  height: 24,
                  border: `solid 2px ${theme.vars.palette.background.paper}`,
                }),
              ]}
            />
          }
        >
          <Avatar alt={_mock.fullName(8)} src={_mock.image.avatar(8)} />
        </Badge>

        {STATUS.map((status, index) => (
          <Tooltip key={status} title={status}>
            <Badge variant={status} badgeContent="">
              <Avatar alt={_mock.fullName(index + 1)} src={_mock.image.avatar(index + 1)} />
            </Badge>
          </Tooltip>
        ))}

        {STATUS.map((status) => (
          <Tooltip key={status} title={status}>
            <Badge variant={status} badgeContent="">
              <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
                {COLORS.slice(0, 2).map((color, index) => (
                  <Avatar
                    key={color}
                    alt={_mock.fullName(index + 1)}
                    src={_mock.image.avatar(index + 1)}
                  />
                ))}
              </AvatarGroup>
            </Badge>
          </Tooltip>
        ))}
      </ComponentBox>
    ),
  },
  {
    name: 'Sizes',
    component: (
      <ComponentBox>
        {[24, 32, 48, 56, 64, 80, 128].map((size, index) => (
          <Avatar
            key={size}
            alt={_mock.fullName(index + 4)}
            src={_mock.image.avatar(index + 4)}
            sx={{ width: size, height: size }}
          />
        ))}
      </ComponentBox>
    ),
  },
];

// ----------------------------------------------------------------------

export function AvatarView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Avatar',
        moreLinks: ['https://mui.com/material-ui/react-avatar/'],
      }}
    />
  );
}
