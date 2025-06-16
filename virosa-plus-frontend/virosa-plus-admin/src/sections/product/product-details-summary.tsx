import type { IProductItem } from 'src/types/product';
import type { CheckoutContextValue } from 'src/types/checkout';

import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ColorPicker } from 'src/components/color-utils';
import { NumberInput } from 'src/components/number-input';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  disableActions?: boolean;
  items?: CheckoutContextValue['state']['items'];
  onAddToCart?: CheckoutContextValue['onAddToCart'];
};

export function ProductDetailsSummary({
  items,
  product,
  onAddToCart,
  disableActions,
  ...other
}: Props) {
  const router = useRouter();

  const {
    id,
    name,
    sizes,
    price,
    colors,
    coverUrl,
    newLabel,
    available,
    priceSale,
    saleLabel,
    totalRatings,
    totalReviews,
    inventoryType,
    subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm<typeof defaultValues>({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.info('DATA', JSON.stringify(data, null, 2));

    try {
      if (!existProduct) {
        onAddToCart?.({ ...data, colors: [values.colors] });
      }
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddToCart?.({
        ...values,
        colors: [values.colors],
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddToCart, values]);

  const renderPrice = () => (
    <Box sx={{ typography: 'h5' }}>
      {priceSale && (
        <Box
          component="span"
          sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        justifyContent: 'center',
        [`& .${linkClasses.root}`]: {
          gap: 1,
          alignItems: 'center',
          display: 'inline-flex',
          color: 'text.secondary',
          typography: 'subtitle2',
        },
      }}
    >
      <Link>
        <Iconify icon="mingcute:add-line" width={16} />
        Compare
      </Link>

      <Link>
        <Iconify icon="solar:heart-bold" width={16} />
        Favorite
      </Link>

      <Link>
        <Iconify icon="solar:share-bold" width={16} />
        Share
      </Link>
    </Box>
  );

  const renderColorOptions = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            options={colors}
            value={field.value}
            onChange={(color) => field.onChange(color as string)}
            limit={4}
          />
        )}
      />
    </Box>
  );

  const renderSizeOptions = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <Field.Select
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="text.primary">
            Size chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: { mx: 0, mt: 1, textAlign: 'right' },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Field.Select>
    </Box>
  );

  const renderQuantity = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <NumberInput
          hideDivider
          value={values.quantity}
          onChange={(event, quantity: number) => setValue('quantity', quantity)}
          max={available}
          sx={{ maxWidth: 112 }}
        />

        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: 'right', color: 'text.secondary' }}
        >
          Available: {available}
        </Typography>
      </Stack>
    </Box>
  );

  const renderActions = () => (
    <Box sx={{ gap: 2, display: 'flex' }}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disableActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disableActions}>
        Buy now
      </Button>
    </Box>
  );

  const renderSubDescription = () => (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderRating = () => (
    <Box
      sx={{
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
        color: 'text.disabled',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </Box>
  );

  const renderLabels = () =>
    (newLabel.enabled || saleLabel.enabled) && (
      <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
        {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
        {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
      </Box>
    );

  const renderInventoryType = () => (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels()}
          {renderInventoryType()}

          <Typography variant="h5">{name}</Typography>

          {renderRating()}
          {renderPrice()}
          {renderSubDescription()}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions()}
        {renderSizeOptions()}
        {renderQuantity()}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions()}
        {renderShare()}
      </Stack>
    </Form>
  );
}
