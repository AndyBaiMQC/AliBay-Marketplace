import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import LeftSiderList from './LeftSiderList.jsx';

export default function SwipeableTemporaryDrawer(props) {

  return (
    <SwipeableDrawer
      anchor="left"
      open={props.open}
      onClose={() => props.changeStatus(false)}
      onOpen={() => props.changeStatus(true)}
    >
      <LeftSiderList
        click={() => props.changeStatus(false)}
        onKeyDown={() => props.changeStatus(false)}
      />
    </SwipeableDrawer>
  );
}
