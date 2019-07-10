import React from "react";

import { Image, Card, Button } from "semantic-ui-react";

class CardCoupon extends React.Component {
  state = {};

  render() {
    const {
      idcoupon,
      name,
      activateDate,
      expiredDate,
      img,
      description,
      handEditCoupon,
      DeleteCoupon
    } = this.props;
    return (
      <Card>
        <Image src={img} size="medium" />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{`${activateDate} to ${expiredDate}`}</span>
          </Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            floated="right"
            circular
            icon="trash alternate outline"
            onClick={DeleteCoupon}
            idcoupon={idcoupon}
          />
          <Button
            floated="right"
            circular
            icon="edit"
            onClick={handEditCoupon}
            editcoupon={{
              idcoupon,
              name,
              activateDate,
              expiredDate,
              img,
              description
            }}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default CardCoupon;
