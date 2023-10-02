import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from '../lib/axiosConfig';

const EnhancedTableToolbar = (props) => {
  const { numSelected, data, type, rows, setRows, setSelected } = props;
  const navigate = useNavigate();

  const tableTitle = (type) => {
    switch (type) {
      case 'users':
        return 'Users';
      case 'recipes':
        return 'Recipes';
      case 'meals':
        return 'Meals';
      case 'meals/types':
        return 'Meal Types';
      case 'cuisines':
        return 'Cuisines';
      case 'preferences':
        return 'Preferences';
      case 'allergies':
        return 'Allergies';
      case 'ingredients':
        return 'Ingredients';
      default:
        return 'Home';
    }
  };

  const nagivationPrefix = (type) => {
    switch (type) {
      case 'users':
        return '/users';
      case 'recipes':
        return '/recipes';
      case 'meals':
        return '/meals';
      case 'meals/types':
        return '/mealtypes';
      case 'cuisines':
        return '/cuisines';
      case 'preferences':
        return '/preferences';
      case 'allergies':
        return '/allergies';
      case 'ingredients':
        return '/ingredients';
      default:
        return '/';
    }
  };

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
          {tableTitle(type)}
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          {numSelected === 1 && (
            <React.Fragment>
              <Tooltip title='View'>
                <IconButton
                  onClick={() =>
                    navigate(`${nagivationPrefix(type)}/${data[0]}`)
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
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
