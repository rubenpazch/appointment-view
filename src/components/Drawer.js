/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default function TemporaryDrawer({
  anchor, open, toggleDrawerExternal, togleDrawerState,
}) {
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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
