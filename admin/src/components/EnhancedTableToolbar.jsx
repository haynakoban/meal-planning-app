import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from '../lib/axiosConfig';

const EnhancedTableToolbar = (props) => {
  const { numSelected, data, type, rows, setRows, setSelected } = props;

  const destroy = async () => {
    try {
      const response = await axios.delete(`${type}`, {
        data: { ids: data },
      });

      if (response.data?.status === 'success') {
        setRows(rows.filter((item) => !data.includes(item._id)));
        setSelected([]);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Cuisines
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          {numSelected === 1 && (
            <Tooltip title='Edit'>
              <IconButton onClick={() => console.log(data)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <IconButton onClick={() => destroy()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
