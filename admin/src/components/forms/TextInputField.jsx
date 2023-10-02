import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';

const TextInputField = ({ errors, name, label, register, watch }) => {
  return (
    <FormControl
      variant='outlined'
      fullWidth
      size='small'
      required
      {...(errors && { error: true })}
    >
      <OutlinedInput
        autoComplete='off'
        sx={{
          py: 1,
          borderRadius: 2,
          fontWeight: '500 !important',
          fontSize: '0.875rem',
        }}
        id={label}
        type='text'
        value={watch(name)}
        {...register(name, {
          required: 'This field is required',
        })}
      />
      {errors && <FormHelperText id={label}>{errors}</FormHelperText>}
    </FormControl>
  );
};
export default TextInputField;
