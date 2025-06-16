import type { IInvoiceItem } from 'src/types/invoice';

import { sumBy } from 'es-toolkit';
import { useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { InvoiceTotalSummary } from './invoice-total-summary';

// ----------------------------------------------------------------------

export const defaultItem: Omit<IInvoiceItem, 'id'> = {
  title: '',
  description: '',
  service: INVOICE_SERVICE_OPTIONS[0].name,
  price: INVOICE_SERVICE_OPTIONS[0].price,
  quantity: 1,
  total: 0,
};

const getFieldNames = (index: number): Record<keyof typeof defaultItem, string> => ({
  title: `items[${index}].title`,
  description: `items[${index}].description`,
  service: `items[${index}].service`,
  quantity: `items[${index}].quantity`,
  price: `items[${index}].price`,
  total: `items[${index}].total`,
});

export function InvoiceNewEditDetails() {
  const { control, setValue, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const items = getValues('items');
  const taxes = getValues('taxes');
  const discount = getValues('discount');
  const shipping = getValues('shipping');

  const subtotal = sumBy(items, (item: IInvoiceItem) => item.quantity * item.price);
  const subtotalWithTax = subtotal + subtotal * (taxes / 100);
  const totalAmount = subtotalWithTax - discount - shipping;

  useEffect(() => {
    setValue('subtotal', subtotal);
    setValue('totalAmount', totalAmount);
  }, [setValue, subtotal, totalAmount]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <InvoiceItem
            key={item.id}
            fieldNames={getFieldNames(index)}
            onRemoveItem={() => remove(index)}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-end', md: 'center' },
        }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => append(defaultItem)}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        <Box
          sx={{
            gap: 2,
            width: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Field.Text
            size="small"
            label="Shipping($)"
            name="shipping"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Text
            size="small"
            label="Discount($)"
            name="discount"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Text
            size="small"
            label="Taxes(%)"
            name="taxes"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
      </Box>

      <InvoiceTotalSummary
        taxes={taxes}
        shipping={shipping}
        subtotal={subtotal}
        discount={discount}
        totalAmount={totalAmount}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type InvoiceItemProps = {
  onRemoveItem: () => void;
  fieldNames: Record<keyof typeof defaultItem, string>;
};

export function InvoiceItem({ onRemoveItem, fieldNames }: InvoiceItemProps) {
  const { getValues, setValue } = useFormContext();

  const priceInput = getValues(fieldNames.price);
  const quantityInput = getValues(fieldNames.quantity);

  useEffect(() => {
    const totalValue = Number((priceInput * quantityInput).toFixed(2));

    setValue(fieldNames.total, totalValue);
  }, [fieldNames.total, priceInput, quantityInput, setValue]);

  const handleSelectService = useCallback(
    (option: string) => {
      const selectedService = INVOICE_SERVICE_OPTIONS.find((service) => service.name === option);

      setValue(fieldNames.price, selectedService?.price);
    },
    [fieldNames.price, setValue]
  );

  const handleClearService = useCallback(() => {
    setValue(fieldNames.quantity, defaultItem.quantity);
    setValue(fieldNames.price, defaultItem.price);
    setValue(fieldNames.total, defaultItem.total);
  }, [fieldNames.price, fieldNames.quantity, fieldNames.total, setValue]);

  return (
    <Box
      sx={{
        gap: 1.5,
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          gap: 2,
          width: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Field.Text
          size="small"
          name={fieldNames.title}
          label="Title"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Field.Text
          multiline
          maxRows={3}
          size="small"
          name={fieldNames.description}
          label="Description"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Field.Select
          size="small"
          name={fieldNames.service}
          label="Service"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ maxWidth: { md: 160 } }}
        >
          <MenuItem
            value=""
            onClick={handleClearService}
            sx={{ fontStyle: 'italic', color: 'text.secondary' }}
          >
            None
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {INVOICE_SERVICE_OPTIONS.map((service) => (
            <MenuItem
              key={service.id}
              value={service.name}
              onClick={() => handleSelectService(service.name)}
            >
              {service.name}
            </MenuItem>
          ))}
        </Field.Select>

        <Field.Text
          size="small"
          type="number"
          name={fieldNames.quantity}
          label="Quantity"
          placeholder="0"
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ maxWidth: { md: 96 } }}
        />

        <Field.Text
          size="small"
          type="number"
          name={fieldNames.price}
          label="Price"
          placeholder="0.00"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: { md: 96 } }}
        />

        <Field.Text
          disabled
          size="small"
          name={fieldNames.total}
          type="number"
          label="Total"
          placeholder="0.00"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            maxWidth: { md: 128 },
            [`& .${inputBaseClasses.input}`]: { textAlign: { md: 'right' } },
          }}
        />
      </Box>

      <Button
        size="small"
        color="error"
        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        onClick={onRemoveItem}
      >
        Remove
      </Button>
    </Box>
  );
}
