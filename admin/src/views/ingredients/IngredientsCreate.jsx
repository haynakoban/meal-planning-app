import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import axios from '../../lib/axiosConfig';
import MainLayout from '../../layout';
import StyledBoxContainer from '../../components/base/StyledBoxContainer';
import TextInputField from '../../components/forms/TextInputField';

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
    },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data) => {
    const { name } = data;
    const userInfo = await axios.get(`admin/auth`);

    if (!userInfo) {
      return setError('name', {
        type: 'server',
        message: 'Something went wrong, please try again',
      });
    }

    if (name) {
      const response = await axios.post('ingredients', {
        name: name,
        admin_id: userInfo?.user_id,
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
          </StyledBoxContainer>
        </Box>
      </Box>
    </MainLayout>
  );
};
export default IngredientsCreate;
