import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import axios from '../../lib/axiosConfig';
import MainLayout from '../../layout';
import StyledBoxContainer from '../../components/base/StyledBoxContainer';
import TextInputField from '../../components/forms/TextInputField';
import { FormControl, MenuItem, Select } from '@mui/material';

const IngredientsCreate = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: 'beverages',
    },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data) => {
    const { name, category } = data;

    const userInfo = await axios.get(`admin/auth`);

    if (!userInfo) {
      return setError('name', {
        type: 'server',
        message: 'Something went wrong, please try again',
      });
    }

    if (name && category) {
      const response = await axios.post('ingredients', {
        name: name,
        category: category,
        admin_id: userInfo.data?.user_id,
      });

      if (response.data?.status === 'record created') {
        navigate('/ingredients');
      } else {
        setError('name', {
          type: 'server',
          message: response.data?.err || 'item already exist',
        });
      }
    }
  };

  const c = [
    'beverages',
    'coconut',
    'condiments',
    'dairy',
    'eggs',
    'fruits',
    'grains',
    'legumes',
    'meats',
    'oil',
    'pasta',
    'powders',
    'rice',
    'sausages',
    'seafoods',
    'spices',
    'sweetener / sweets',
    'tapioca pearls / jelatin',
    'vegetables',
    'wrapper',
  ];

  return (
    <MainLayout>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          }}
        >
          <StyledBoxContainer text='Ingredient Name'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextInputField
                errors={errors.name?.message}
                name='name'
                label='Name'
                register={register}
                watch={watch}
              />
            </Box>
          </StyledBoxContainer>

          <StyledBoxContainer text='Category'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl fullWidth>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={watch('category')}
                  {...register('category')}
                >
                  {c.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </StyledBoxContainer>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-start',
              },
              mt: 3,
            }}
          >
            <Button
              variant='contained'
              onClick={handleSubmit(handleFormSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};
export default IngredientsCreate;
