import React from "react";
import api from "../../../../api/api";

import { Form } from "semantic-ui-react";

class TextForm extends React.Component {
  state = {
    data: {
      uid: "",
      packageId: "",
      stickerId: ""
    },
    selectedOption: "Push",
    loading: false,
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!data.uid && this.state.selectedOption === "Push")
      errors.uid = "Can't be blank";
    if (!data.packageId) errors.packageId = "Can't be blank";
    if (!data.stickerId) errors.stickerId = "Can't be blank";

    return errors;
  };

  onSubmit = event => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const body = JSON.stringify({
        events: [
          {
            type: "sticker",
            id: this.state.data.uid,
            packageId: this.state.data.packageId,
            stickerId: this.state.data.stickerId
          }
        ]
      }); // Request body string

      this.setState({ loading: true });

      this.state.selectedOption === "Push"
        ? api.linebot.push(body).then(res => {
            res.data === "OK" &&
              this.setState({
                data: {
                  uid: "",
                  packageId: "",
                  stickerId: ""
                },
                loading: false
              });
          })
        : api.linebot.multicast(body).then(res => {
            res.data === "OK" &&
              this.setState({
                data: {
                  uid: "",
                  packageId: "",
                  stickerId: ""
                },
                loading: false
              });
          });
    }
  };

  handleChange = (e, data) => {
    this.setState({ selectedOption: data.value });
  };

  updateInputValue = evt => {
    this.setState({
      data: { ...this.state.data, [evt.target.name]: evt.target.value }
    });
  };

  render() {
    const { data, selectedOption, errors, loading } = this.state;

    return (
      <Form loading={loading}>
        <Form.Group inline>
          <label>Type</label>
          <Form.Radio
            label="Push"
            value="Push"
            name="Push"
            checked={selectedOption === "Push"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label="Multicast:"
            value="Multicast"
            name="Multicast"
            checked={selectedOption === "Multicast"}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            error={!!errors.uid && selectedOption === "Push"}
            fluid
            label="UID:"
            placeholder="UID"
            name="uid"
            value={data.uid}
            disabled={selectedOption === "Multicast"}
            onChange={this.updateInputValue}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            error={!!errors.packageId}
            fluid
            label="PackageId:"
            placeholder="PackageId"
            name="packageId"
            value={data.packageId}
            onChange={this.updateInputValue}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            error={!!errors.stickerId}
            fluid
            label="StickerId:"
            placeholder="StickerId"
            name="stickerId"
            value={data.stickerId}
            onChange={this.updateInputValue}
          />
        </Form.Group>
        <Form.Button type="submit" color="olive" onClick={this.onSubmit}>
          Send
        </Form.Button>
      </Form>
    );
  }
}

export default TextForm;
