import React from "react";
import { Button, Icon, Header, Modal, Card } from "semantic-ui-react";

class ModalMenu extends React.Component {
  render() {
    const { modal, handleCloseMenu, idstore } = this.props;
    return (
      <div>
        <Modal open={modal} onClose={handleCloseMenu}>
          <Header icon="list layout" content="Menu" />
          <Modal.Content>
            <Card.Group />
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={handleCloseMenu} inverted>
              <Icon name="close" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalMenu;
