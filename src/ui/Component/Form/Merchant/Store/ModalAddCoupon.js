import React from "react";
import api from "../../../../../api/api";
import { Button, Icon, Image, Modal, Form } from "semantic-ui-react";

class ModalAddCoupon extends React.Component {
  state = {
    data: {
      idcoupon: "",
      name: "",
      description: "",
      activateDate: "",
      expiredDate: "",
      img: ""
    },
    file: "",
    imagePreviewUrl: "",
    loading: false,
    errors: {}
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

  validate = (data, imagePreviewUrl) => {
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.activateDate) errors.activateDate = "Can't be blank";
    if (!data.expiredDate) errors.expiredDate = "Can't be blank";
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
        idstore: this.props.idstore,
        idcoupon: this.state.data.idcoupon,
        namecoupon: this.state.data.name,
        activateDate: this.state.data.activateDate,
        expiredDate: this.state.data.expiredDate,
        description: this.state.data.description,
        imagenew: this.state.imagePreviewUrl,
        imageold: this.state.data.img
      }; // Request body string

      !this.props.editCoupon.editing
        ? api.merchant.addcoupon(body).then(res => {
            this.props.handCloseCoupon();
            this.props.LoadDataCoupon(this.props.idstore);
          })
        : api.merchant.editcoupon(body).then(res => {
            this.props.handCloseCoupon();
            this.props.LoadDataCoupon(this.props.idstore);
          });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editCoupon.editing) {
      this.setState({
        data: {
          idcoupon: nextProps.editCoupon.idcoupon,
          name: nextProps.editCoupon.name,
          description: nextProps.editCoupon.description,
          activateDate: nextProps.editCoupon.activateDate,
          expiredDate: nextProps.editCoupon.expiredDate,
          img: nextProps.editCoupon.img
        },
        errors: {}
      });
    }
  }

  render() {
    const { modalAddOpen, handCloseCoupon, editCoupon } = this.props;
    const { data, errors, imagePreviewUrl, loading } = this.state;
    return (
      <Modal open={modalAddOpen} onClose={handCloseCoupon}>
        <Modal.Header>
          {editCoupon.editing ? "Edit Coppon" : "New Coppon"}
        </Modal.Header>
        <Modal.Content image scrolling>
          <Image
            size="medium"
            src={
              imagePreviewUrl ||
              editCoupon.img ||
              "https://react.semantic-ui.com/images/wireframe/image.png"
            }
            wrapped
          />
          <Modal.Description>
            <Form loading={loading}>
              <label>Name</label>
              <Form.Input
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={this.updateInputValue}
                error={!!errors.name}
              />
              <label>Description</label>
              <Form.Input
                placeholder="Description"
                name="description"
                value={data.description}
                onChange={this.updateInputValue}
                error={!!errors.description}
              />
              <label>Activation Date</label>

              <Form.Input
                type="date"
                value={data.activateDate}
                name="activateDate"
                onChange={this.updateInputValue}
                error={!!errors.activateDate}
              />
              <label>Expiration Date</label>

              <Form.Input
                type="date"
                value={data.expiredDate}
                name="expiredDate"
                onChange={this.updateInputValue}
                error={!!errors.expiredDate}
              />
              <label>Image</label>
              <Form.Input
                type="file"
                onChange={this._handleImageChange}
                error={!!errors.imagePreviewUrl}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.OnSubmit}>
            Submit
          </Button>
          <Button color="red" onClick={handCloseCoupon} inverted>
            <Icon name="close" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalAddCoupon;
