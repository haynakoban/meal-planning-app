import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import axios from '../../lib/axiosConfig';
import MainLayout from '../../layout';
import StyledBoxContainer from '../../components/base/StyledBoxContainer';
import TextInputField from '../../components/forms/TextInputField';
import DescriptionField from '../../components/forms/DescriptionField';

const PreferencesCreate = () => {
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
      description: '',
    },
    mode: 'onChange',
  });

  const handleFormSubmit = async (data) => {
    const { name, description } = data;

    if (name) {
      const response = await axios.post('preferences', { name, description });

      if (response.data?.status === 'record created') {
        navigate('/preferences');
      } else {
        setError('name', {
          type: 'server',
          message: response.data?.message || 'Invalid input. Please try again.',
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
            flexDirection: 'column',
          }}
        >
          <StyledBoxContainer text='Preference Name'>
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
          <StyledBoxContainer text='Description'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DescriptionField
                name='description'
                label='Description'
                register={register}
                watch={watch}
                message={``}
              />
            </Box>
          </StyledBoxContainer>
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
            px: 2,
          }}
        >
          <Button variant='contained' onClick={handleSubmit(handleFormSubmit)}>
            Submit
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};
export default PreferencesCreate;
