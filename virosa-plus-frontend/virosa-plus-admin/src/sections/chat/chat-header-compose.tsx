import type { IChatParticipant } from 'src/types/chat';

import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  contacts: IChatParticipant[];
  onAddRecipients: (selected: IChatParticipant[]) => void;
};

export function ChatHeaderCompose({ contacts, onAddRecipients }: Props) {
  const [searchRecipients, setSearchRecipients] = useState('');

  const handleAddRecipients = useCallback(
    (selected: IChatParticipant[]) => {
      setSearchRecipients('');
      onAddRecipients(selected);
    },
    [onAddRecipients]
  );

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'text.primary', mr: 2 }}>
        To:
      </Typography>

      <Autocomplete
        sx={{ minWidth: { md: 320 }, flexGrow: { xs: 1, md: 'unset' } }}
        multiple
        limitTags={3}
        popupIcon={null}
        defaultValue={[]}
        disableCloseOnSelect
        noOptionsText={<SearchNotFound query={searchRecipients} />}
        onChange={(event, newValue) => handleAddRecipients(newValue)}
        onInputChange={(event, newValue) => setSearchRecipients(newValue)}
        options={contacts}
        getOptionLabel={(recipient) => recipient.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} placeholder="+ Recipients" />}
        renderOption={(props, recipient, { selected }) => (
          <li {...props} key={recipient.id}>
            <Box
              key={recipient.id}
              sx={{
                mr: 1,
                width: 32,
                height: 32,
                overflow: 'hidden',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              <Avatar alt={recipient.name} src={recipient.avatarUrl} sx={{ width: 1, height: 1 }} />
              <Box
                sx={[
                  (theme) => ({
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    opacity: 0,
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.8),
                    transition: theme.transitions.create(['opacity'], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                    ...(selected && { opacity: 1, color: 'primary.main' }),
                  }),
                ]}
              >
                <Iconify icon="eva:checkmark-fill" />
              </Box>
            </Box>

            {recipient.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((recipient, index) => (
            <Chip
              {...getTagProps({ index })}
              key={recipient.id}
              label={recipient.name}
              avatar={<Avatar alt={recipient.name} src={recipient.avatarUrl} />}
              size="small"
              variant="soft"
            />
          ))
        }
      />
    </>
  );
}
