import React from "react";

import { Menu } from "semantic-ui-react";

class Navbar extends React.Component {
  render() {
    return (
      <Menu borderless inverted fluid>
        <Menu.Item header as="h3">
          Project name
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
