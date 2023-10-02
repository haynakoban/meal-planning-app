import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

const DescriptionField = ({ name, label, message, register, watch }) => {
  return (
    <FormControl variant='outlined' fullWidth size='small'>
      <OutlinedInput
        multiline
        rows={5}
        sx={{
          py: 1,
          borderRadius: 2,
          fontWeight: '500 !important',
          fontSize: '0.875rem',
        }}
        autoComplete='off'
        id={label}
        type='text'
        value={watch(name)}
        {...register(name)}
      />
      {message && <FormHelperText id={label}>{message}</FormHelperText>}
    </FormControl>
  );
};
export default DescriptionField;
