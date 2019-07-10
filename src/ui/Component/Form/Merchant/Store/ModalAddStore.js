import React from "react";
import axios from "axios";
import api from "../../../../../api/api";

import { Button, Icon, Form, Modal, Image } from "semantic-ui-react";

class ModalAddStore extends React.Component {
  state = {
    data: {
      idstore: "",
      namestore: "",
      starttime: "08:00",
      endtime: "19:00",
      description: "",
      img: ""
    },
    file: "",
    imagePreviewUrl: "",
    loading: false,
    errors: {}
  };

  validate = (data, imagePreviewUrl) => {
    const errors = {};
    if (!data.namestore) errors.namestore = "Can't be blank";
    if (!data.starttime) errors.starttime = "Can't be blank";
    if (!data.endtime) errors.endtime = "Can't be blank";
    if (!data.description) errors.description = "Can't be blank";
    if (!imagePreviewUrl && !data.img)
      errors.imagePreviewUrl = "Can't be blank";

    return errors;
  };

  OnSubmit = (e, titleProps) => {
    const errors = this.validate(this.state.data, this.state.imagePreviewUrl);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const body = {
        idstore: this.state.data.idstore,
        namestore: this.state.data.namestore,
        starttime: this.state.data.starttime,
        endtime: this.state.data.endtime,
        description: this.state.data.description,
        imagenew: this.state.imagePreviewUrl,
        imageold: this.state.data.img
      }; // Request body string

      !this.props.editStore.editing
        ? api.merchant.addstore(body).then(res => {
            this.props.LoadData();
            this.props.handCloseStore();
          })
        : api.merchant.editstore(body).then(res => {
            this.props.LoadData();
            this.props.handCloseStore();
          });
    }
  };
  updateInputValue = evt => {
    this.setState({
      data: { ...this.state.data, [evt.target.name]: evt.target.value }
    });
  };

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.editStore.editing) {
    this.setState({
      data: {
        idstore: nextProps.editStore.idstore,
        namestore: nextProps.editStore.namestore,
        starttime: nextProps.editStore.starttime,
        endtime: nextProps.editStore.endtime,
        description: nextProps.editStore.description,
        img: nextProps.editStore.img
      },
      errors: {}
    });
    // }
  }

  render() {
    const { modal, handCloseStore, editStore } = this.props;
    const { data, imagePreviewUrl, errors, loading } = this.state;
    return (
      <Modal open={modal} onClose={handCloseStore}>
        <Modal.Header>
          {editStore.editing ? "Edit Store" : "New Store"}
        </Modal.Header>

        <Modal.Content image scrolling>
          <Image
            size="medium"
            src={
              imagePreviewUrl ||
              editStore.img ||
              "https://react.semantic-ui.com/images/wireframe/image.png"
            }
            wrapped
          />
          <Modal.Description>
            <Form loading={loading}>
              <label>Name Store</label>
              <Form.Input
                width={6}
                placeholder="Name Store"
                name="namestore"
                value={data.namestore}
                onChange={this.updateInputValue}
                error={!!errors.namestore}
              />
              <Form.Input
                width={6}
                placeholder="Description"
                name="description"
                value={data.description}
                onChange={this.updateInputValue}
                error={!!errors.description}
              />
              <Form.Input
                type="time"
                value={data.starttime}
                name="starttime"
                onChange={this.updateInputValue}
                error={!!errors.starttime}
              />
              <Form.Input
                type="time"
                value={data.endtime}
                name="endtime"
                onChange={this.updateInputValue}
                error={!!errors.endtime}
              />

              <Form.Input
                type="file"
                onChange={this._handleImageChange}
                error={!!errors.imagePreviewUrl}
              />
            </Form>
          </Modal.Description>

          <Modal />
        </Modal.Content>
        <Modal.Actions>
          <Button icon basic color="green" onClick={this.OnSubmit}>
            <Icon name="check" color="green" />
          </Button>
          <Button icon basic color="red" onClick={handCloseStore}>
            <Icon name="delete" color="red" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalAddStore;
