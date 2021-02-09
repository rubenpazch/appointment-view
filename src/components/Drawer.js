/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { removeToken } from '../app/modules/Auth/_redux/authAction';

export default function TemporaryDrawer({
  anchor, open, toggleDrawerExternal, togleDrawerState,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClickDoctorCalendar = () => {
    history.push('/');
  };
  const onSubmitLogout = () => {
    dispatch(removeToken());
  };
  // const [state, setState] = React.useState({
  //   top: false,
  //   left: false,
  //   bottom: false,
  //   right: false,
  // });
  // console.log({ open });
  // const toggleDrawer = (anchorParam, openParam) => event => {
  //   console.log({ openParam });
  //   console.log({ event });
  //   if (typeof (event) !== 'undefined') {
  //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //       return;
  //     }
  //   }
  //   setState({ ...state, [anchorParam]: openParam });
  // };

  // useEffect(() => {
  //   toggleDrawer(anchor, open)();
  // }, [open]);

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
        <ListItem button key="2">
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

  // useEffect(() => {
  //   toggleDrawer(anchor, open);
  // }, [open]);

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer anchor={anchor} open={togleDrawerState[anchor]}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
