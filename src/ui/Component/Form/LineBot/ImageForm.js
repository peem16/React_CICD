import React from "react";
import api from "../../../../api/api";

import { Form } from "semantic-ui-react";

class TextForm extends React.Component {
  state = {
    data: {
      uid: ""
    },
    loading: false,
    selectedOption: "Push",
    selectedFile: null,
    errors: {}
  };

  validate = (data, selectedFile) => {
    const errors = {};
    if (!data.uid && this.state.selectedOption === "Push")
      errors.uid = "Can't be blank";
    if (!selectedFile) errors.selectedFile = "Can't be blank";

    return errors;
  };

  onSubmit = event => {
    const errors = this.validate(this.state.data, this.state.selectedFile);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });

      const body = JSON.stringify({
        events: [
          {
            type: "image",
            id: this.state.data.uid,
            image: this.state.selectedFile
          }
        ]
      }); // Request body string

      this.state.selectedOption === "Push"
        ? api.linebot.push(body).then(res => {
            res.data === "OK" &&
              this.setState({
                data: {
                  uid: ""
                },
                selectedFile: null,
                Filename: "",
                loading: false
              });
          })
        : api.linebot.multicast(body).then(res => {
            res.data === "OK" &&
              this.setState({
                data: {
                  uid: ""
                },
                selectedFile: null,
                Filename: "",
                loading: false
              });
          });
      this.fileInput.value = null;
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

  updateImage = event => {
    var self = this;
    var reader = new FileReader();
    var file = event.target.files[0];
    reader.onload = function(upload) {
      self.setState({
        selectedFile: upload.target.result
      });
    };

    reader.readAsDataURL(file);
  };
  render() {
    const { data, selectedOption, loading, errors } = this.state;

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
        <Form.Group
          widths="equal"
          //  error={!!errors.selectedFile}
        >
          <input
            type="file"
            onChange={this.updateImage}
            label="Image:"
            ref={ref => (this.fileInput = ref)}
            name="image"
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
