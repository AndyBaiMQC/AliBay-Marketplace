import Container from '@material-ui/core/Container';
import React from 'react';
import PrimarySearchAppBar from './AppBar';
function Layout(props) {

  return (
      <Container maxWidth="100%" style={{ padding: 0 }} >
        <PrimarySearchAppBar />
        {props.children}
      </Container>
  );
}

export default Layout;
