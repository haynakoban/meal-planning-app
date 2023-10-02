import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import axios from '../../lib/axiosConfig';
import MainLayout from '../../layout';
import StyledBox from '../../components/base/StyledBox';
import StyledBoxContainer from '../../components/base/StyledBoxContainer';
import TextInputField from '../../components/forms/TextInputField';
import DescriptionField from '../../components/forms/DescriptionField';

const AllergiesUpdate = () => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [allergy, setAllergy] = React.useState({});

  const [nameVisible, setNameVisible] = React.useState(false);
  const [descriptionVisible, setDescriptionVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    setLoading(true);
    setProgress(0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`allergies/${id}`, {
          onDownloadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
            const percentCompleted = Math.round((loaded / total) * 100);
            setProgress(percentCompleted);
          },
        });

        if (response.data?.status === 'success') {
          setAllergy(response.data?.data);
          setValue('name', response.data?.data?.name);
          setValue('description', response.data?.data?.description);
        } else {
          setAllergy({});
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [id, setValue, setAllergy]);

  const handleFormSubmit = async (data, property) => {
    try {
      const response = await axios.put(`allergies/${id}`, {
        property,
        [property]: data[property],
      });

      if (response.data?.status === 'success') {
        setAllergy(response.data?.data);
        setValue('name', response.data?.data?.name);
        setValue('description', response.data?.data?.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      {loading && (
        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            color: '#685CFE',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999999,
          }}
        />
      )}
      <Box sx={{ width: '100%' }}>
        {!loading ? (
          <React.Fragment>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              }}
            >
              <StyledBoxContainer text='Allergy Name'>
                {nameVisible ? (
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
                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('name', allergy?.name);
                          setNameVisible(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Apply Changes'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          handleSubmit((data) =>
                            handleFormSubmit(data, 'name')
                          )();
                          setNameVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox text={allergy?.name} setVisible={setNameVisible} />
                )}
              </StyledBoxContainer>

              <StyledBoxContainer text='Description'>
                {descriptionVisible ? (
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

                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('description', allergy?.description);
                          setDescriptionVisible(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Apply Changes'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          handleSubmit((data) =>
                            handleFormSubmit(data, 'description')
                          )();
                          setDescriptionVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox
                    text={allergy?.description}
                    setVisible={setDescriptionVisible}
                  />
                )}
              </StyledBoxContainer>
            </Box>
          </React.Fragment>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CircularProgress size={30} />
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default AllergiesUpdate;
