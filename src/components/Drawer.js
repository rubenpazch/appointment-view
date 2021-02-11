/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { removeToken } from '../app/modules/Auth/_redux/authAction';

const TemporaryDrawer = ({
  // eslint-disable-next-line no-unused-vars
  open,
  anchor,
  toggleDrawerExternal,
  togleDrawerState,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClickDoctorCalendar = () => {
    history.push('/');
  };

  const handleClickAppointments = () => {
    history.push('/Appointments');
  };
  const onSubmitLogout = () => {
    dispatch(removeToken());
  };

  const list = anchor => (
    <div
      role="presentation"
      onClick={toggleDrawerExternal(anchor, false)}
      onKeyDown={toggleDrawerExternal(anchor, false)}
    >
      <List>
        <ListItem
          button
          key="1"
          onClick={handleClickDoctorCalendar}
        >
          <ListItemIcon><DateRangeIcon /></ListItemIcon>
          <ListItemText primary="Doctor Calendar" />
        </ListItem>
        <ListItem
          button
          key="2"
          onClick={handleClickAppointments}
        >
          <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
          <ListItemText primary="My Appointments" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="3"
          onClick={onSubmitLogout}
        >
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer anchor={anchor} open={togleDrawerState[anchor]}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

TemporaryDrawer.propTypes = {
  open: PropTypes.bool,
  anchor: PropTypes.string,
  toggleDrawerExternal: PropTypes.func,
  togleDrawerState: PropTypes.any,
};

TemporaryDrawer.defaultProps = {
  open: false,
  anchor: '',
  toggleDrawerExternal: () => {},
  togleDrawerState: null,
};

export default TemporaryDrawer;
