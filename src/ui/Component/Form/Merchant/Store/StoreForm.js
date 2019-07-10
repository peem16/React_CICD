import React from "react";
import axios from "axios";
import ModalAddStore from "./ModalAddStore";
import ModalCoupon from "./ModalCoupon";
import ModalMenu from "./ModalMenu";

import api from "../../../../../api/api";
import { Table, Button, Icon, Form, Image, Modal } from "semantic-ui-react";

class StoreForm extends React.Component {
  state = {
    column: null,
    editStore: {
      idstore: null,
      namestore: null,
      starttime: null,
      endtime: null,
      description: null,
      img: null,
      editing: false
    },
    coupon_list: [],
    coupon_idstore: null,
    data: [],
    direction: null,
    loading: false,
    errors: {},
    modalOpen: false,
    modalMenuOpen: false,
    modalAddStoreOpen: false
  };

  handleOpenCoupon = (e, titleProps) => {
    this.LoadDataCoupon(titleProps.idstore);
  };

  handleOpenMenu = (e, titleProps) => {
    this.setState({ modalMenuOpen: true });
  };
  handleCloseMenu = () => this.setState({ modalMenuOpen: false });

  handleCloseCoupon = () => this.setState({ modalOpen: false });

  handAddStore = () =>
    this.setState({
      modalAddStoreOpen: true,
      editStore: {
        idstore: "",
        namestore: "",
        starttime: "09:00",
        endtime: "19:00",
        description: "",
        img: "",
        editing: false
      }
    });

  handEditStore = (e, titleProps) => {
    this.setState({
      editStore: {
        idstore: titleProps.idstore,
        namestore: titleProps.namestore,
        starttime: titleProps.starttime,
        endtime: titleProps.endtime,
        description: titleProps.description,
        img: titleProps.img,
        editing: true
      },
      modalAddStoreOpen: true
    });
  };

  handCloseStore = () =>
    this.setState({
      modalAddStoreOpen: false,
      editStore: {
        idstore: null,
        namestore: null,
        starttime: null,
        endtime: null,
        description: null,
        img: null,
        editing: false
      }
    });

  LoadData = (e, titleProps) => {
    api.merchant.getstore().then(res => {
      this.setState({
        data: res.data.map(store => {
          return {
            idstore: store.idstore,
            namestore: store.namestore,
            starttime: store.starttime,
            endtime: store.endtime,
            description: store.description,
            img: store.img
          };
        })
      });
    });
  };

  LoadDataCoupon = idstore => {
    api.merchant.getcoupon(idstore).then(res => {
      this.setState({ modalOpen: true });
      this.setState({ coupon_list: res.data });
      this.setState({ coupon_idstore: idstore });
    });
  };

  OnClick_DeleteStore = (e, titleProps) => {
    api.merchant.delstore(titleProps.idstore).then(res => {
      this.LoadData();
    });
  };

  componentDidMount() {
    this.LoadData();
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <ModalAddStore
          modal={this.state.modalAddStoreOpen}
          handCloseStore={this.handCloseStore}
          LoadData={this.LoadData}
          editStore={this.state.editStore}
        />
        <ModalCoupon
          modal={this.state.modalOpen}
          handleCloseCoupon={this.handleCloseCoupon}
          LoadDataCoupon={this.LoadDataCoupon}
          coupon_list={this.state.coupon_list}
          idstore={this.state.coupon_idstore}
        />
        <ModalMenu
          modal={this.state.modalMenuOpen}
          handleCloseMenu={this.handleCloseMenu}
          idstore={this.state.coupon_idstore}
        />

        <Form>
          <Form.Group inline>
            <Button positive onClick={this.handAddStore}>
              Add Store
            </Button>
          </Form.Group>
        </Form>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(
              ({
                idstore,
                namestore,
                starttime,
                endtime,
                description,
                img
              }) => {
                return (
                  <Table.Row key={idstore}>
                    <Table.Cell>{namestore}</Table.Cell>

                    <Table.Cell>
                      <Button.Group basic size="small">
                        <Button
                          icon
                          basic
                          color="blue"
                          onClick={this.handEditStore}
                          idstore={idstore}
                          namestore={namestore}
                          starttime={starttime}
                          endtime={endtime}
                          description={description}
                          img={img}
                        >
                          <Icon name="edit" color="blue" />
                        </Button>
                        <Button
                          icon
                          basic
                          color="blue"
                          idstore={idstore}
                          onClick={this.handleOpenMenu}
                        >
                          <Icon name="list layout" color="blue" />
                        </Button>

                        <Button
                          icon
                          basic
                          color="blue"
                          idstore={idstore}
                          onClick={this.handleOpenCoupon}
                        >
                          <Icon name="ticket" color="blue" />
                        </Button>

                        <Button
                          icon
                          basic
                          color="red"
                          onClick={this.OnClick_DeleteStore}
                          idstore={idstore}
                        >
                          <Icon name="delete" color="red" />
                        </Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default StoreForm;
