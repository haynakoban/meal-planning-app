import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

const StyledBox = ({ text, setVisible }) => {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        border: '1px solid #00000020',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='body2'
        fontWeight='500'
        sx={{
          flex: '1',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          mr: 1,
        }}
      >
        {text || '-'}
      </Typography>
      <Tooltip title='Edit'>
        <IconButton size='small' onClick={() => setVisible(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default StyledBox;
