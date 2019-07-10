import React from "react";
import TextForm from "./Form/LineBot/TextForm";
import StickerForm from "./Form/LineBot/StickerForm";
import ImageForm from "./Form/LineBot/ImageForm";
import StoreForm from "./Form/Merchant/Store/StoreForm";

import { Accordion, Icon, Menu, Grid, Container } from "semantic-ui-react";

class Mainmenu extends React.Component {
  state = {
    selectedMenu: "",
    activeIndex: ""
  };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleClickMenu = (event, data) => {
    this.setState({ selectedMenu: data.value });
  };

  render() {
    const { selectedMenu, activeIndex } = this.state;
    return (
      <Container fluid>
        <Grid padded="horizontally">
          <Grid.Column width={3}>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Line Bot
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name="text"
                    value="text"
                    onClick={this.handleClickMenu}
                    active={selectedMenu === "text"}
                  />
                  <Menu.Item
                    name="sticker"
                    value="sticker"
                    onClick={this.handleClickMenu}
                    active={selectedMenu === "sticker"}
                  />
                  <Menu.Item
                    name="image"
                    value="image"
                    onClick={this.handleClickMenu}
                    active={selectedMenu === "image"}
                  />
                </Menu>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Merchant
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name="store and coupon"
                    value="store"
                    onClick={this.handleClickMenu}
                    active={selectedMenu === "store"}
                  />
                </Menu>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {selectedMenu === "text" && <TextForm />}
            {selectedMenu === "sticker" && <StickerForm />}
            {selectedMenu === "image" && <ImageForm />}
            {selectedMenu === "store" && <StoreForm />}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Mainmenu;
