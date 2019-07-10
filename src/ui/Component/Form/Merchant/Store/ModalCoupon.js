import React from "react";
import CardCoupon from "./CardCoupon";
import ModalAddCoupon from "./ModalAddCoupon";
import api from "./../../../../../api/api";
import { Button, Icon, Header, Modal, Card } from "semantic-ui-react";

class ModalCoupon extends React.Component {
  state = {
    modalAddOpen: false,
    editCoupon: {
      idcoupon: null,
      name: null,
      activateDate: null,
      expiredDate: null,
      description: null,
      img: null,
      editing: false
    }
  };
  handAddCoupon = () =>
    this.setState({
      modalAddOpen: true,
      editCoupon: {
        idcoupon: "",
        nameconpon: "",
        activateDate: "",
        expiredDate: "",
        description: "",
        img: "",
        editing: false
      }
    });
  handEditCoupon = (e, titleProps) => {
    this.setState({
      modalAddOpen: true,
      editCoupon: {
        idcoupon: titleProps.editcoupon.idcoupon,
        name: titleProps.editcoupon.name,
        activateDate: titleProps.editcoupon.activateDate,
        expiredDate: titleProps.editcoupon.expiredDate,
        description: titleProps.editcoupon.description,
        img: titleProps.editcoupon.img,
        editing: true
      }
    });
  };

  handCloseCoupon = () => {
    this.setState({
      modalAddOpen: false,
      editCoupon: {
        idcoupon: null,
        nameconpon: null,
        activateDate: null,
        expiredDate: null,
        description: null,
        img: null,
        editing: false
      }
    });
  };

  DeleteCoupon = (e, titleProps) => {
    api.merchant.delcoupon(titleProps.idcoupon).then(res => {
      this.props.LoadDataCoupon(this.props.idstore);
    });
  };

  render() {
    const { modalAddOpen, editCoupon } = this.state;
    const {
      modal,
      handleCloseCoupon,
      LoadDataCoupon,
      coupon_list,
      idstore
    } = this.props;
    return (
      <div>
        <Modal open={modal} onClose={handleCloseCoupon}>
          <Header icon="ticket" content="Coupon" />
          <Modal.Content>
            <Card.Group>
              {coupon_list.map(
                ({ name, id, activateDate, expiredDate, img, description }) => {
                  return (
                    <CardCoupon
                      key={id}
                      name={name}
                      description={description}
                      activateDate={activateDate}
                      expiredDate={expiredDate}
                      img={img}
                      idcoupon={id}
                      handEditCoupon={this.handEditCoupon}
                      DeleteCoupon={this.DeleteCoupon}
                    />
                  );
                }
              )}
            </Card.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handAddCoupon} inverted>
              <Icon name="add" /> Add
            </Button>
            <Button color="red" onClick={handleCloseCoupon} inverted>
              <Icon name="close" /> Close
            </Button>
          </Modal.Actions>
        </Modal>
        <ModalAddCoupon
          handCloseCoupon={this.handCloseCoupon}
          LoadDataCoupon={LoadDataCoupon}
          modalAddOpen={modalAddOpen}
          idstore={idstore}
          editCoupon={editCoupon}
        />
      </div>
    );
  }
}

export default ModalCoupon;
