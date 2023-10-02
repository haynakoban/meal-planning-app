import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledBoxContainer = ({ text, children }) => {
  return (
    <Box
      sx={{
        letterSpacing: 1.5,
        color: '#737373',
        px: 2,
        mb: 2,
        width: {
          xs: 'calc(100vw - 32px)',
          sm: 'calc(100vw - 32px)',
          md: 418,
        },
      }}
    >
      <Typography variant='caption' fontWeight='600' pl={1}>
        {text}
      </Typography>

      {children}
    </Box>
  );
};
export default StyledBoxContainer;
