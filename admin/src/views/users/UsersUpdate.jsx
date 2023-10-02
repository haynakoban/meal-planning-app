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

const UsersUpdate = () => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [user, setUser] = React.useState({});

  const [fnVisible, setFnVisible] = React.useState(false);
  const [unVisible, setUnVisible] = React.useState(false);
  const [emVisible, setEmVisible] = React.useState(false);
  const [pwVisible, setPwVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    setLoading(true);
    setProgress(0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`users/${id}`, {
          onDownloadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
            const percentCompleted = Math.round((loaded / total) * 100);
            setProgress(percentCompleted);
          },
        });

        if (response.data?.status === 'success') {
          setUser(response.data?.data);
          setValue('fullname', response.data?.data?.fullname);
          setValue('username', response.data?.data?.username);
          setValue('email', response.data?.data?.email);
          setValue('password', response.data?.data?.password);
        } else {
          setUser({});
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
  }, [id, setValue, setUser]);

  const handleFormSubmit = async (data, property) => {
    try {
      const response = await axios.put(`users/${id}`, {
        property,
        [property]: data[property],
      });

      if (response.data?.status === 'success') {
        setUser(response.data?.data);
        setValue('fullname', response.data?.data?.fullname);
        setValue('username', response.data?.data?.username);
        setValue('email', response.data?.data?.email);
        setValue('password', response.data?.data?.password);
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
              <StyledBoxContainer text='Full Name'>
                {fnVisible ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextInputField
                      errors={errors.fullname?.message}
                      name='fullname'
                      label='Full Name'
                      register={register}
                      watch={watch}
                    />
                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('fullname', user?.fullname);
                          setFnVisible(false);
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
                            handleFormSubmit(data, 'fullname')
                          )();
                          setFnVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox text={user?.fullname} setVisible={setFnVisible} />
                )}
              </StyledBoxContainer>

              <StyledBoxContainer text='Username'>
                {unVisible ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextInputField
                      errors={errors.username?.message}
                      name='username'
                      label='Username'
                      register={register}
                      watch={watch}
                    />
                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('username', user?.username);
                          setUnVisible(false);
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
                            handleFormSubmit(data, 'username')
                          )();
                          setUnVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox text={user?.username} setVisible={setUnVisible} />
                )}
              </StyledBoxContainer>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              }}
            >
              <StyledBoxContainer text='Email Address'>
                {emVisible ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextInputField
                      errors={errors.email?.message}
                      name='email'
                      label='Email'
                      register={register}
                      watch={watch}
                    />
                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('email', user?.email);
                          setEmVisible(false);
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
                            handleFormSubmit(data, 'email')
                          )();
                          setEmVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox text={user?.email} setVisible={setEmVisible} />
                )}
              </StyledBoxContainer>

              <StyledBoxContainer text='Password'>
                {pwVisible ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TextInputField
                      errors={errors.password?.message}
                      name='password'
                      label='Password'
                      register={register}
                      watch={watch}
                    />
                    <Tooltip title='Cancel'>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setValue('password', user?.password);
                          setPwVisible(false);
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
                            handleFormSubmit(data, 'password')
                          )();
                          setPwVisible(false);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <StyledBox text={user?.password} setVisible={setPwVisible} />
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

export default UsersUpdate;
