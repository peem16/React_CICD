import React from "react";
import { hot } from "react-hot-loader";
// import Navbar from "./ui/Component/navbar";
// import Mainmenu from "./ui/Component/mainmenu";

import { Grid, Container } from "semantic-ui-react";


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      result: null,
    }
    this.elements = {}
    this.onPlus = this.onPlus.bind(this);
  }
  plus(firstValue, secondValue) {
    return firstValue + secondValue
  }
  onPlus() {
    const firstValue = parseInt(this.elements.firstValue.value, 10)
    const secondValue = parseInt(this.elements.secondValue.value, 10)
    const resultPlus = this.plus(firstValue, secondValue)
    this.setState({
      result: resultPlus,
    });
  }
  render() {
    const { result } = this.state
    return (
      // <div>
      //   <Container fluid>
      //     <Grid>
      //       <Grid.Row>
      //         <Navbar />
      //       </Grid.Row>
      //       <Grid.Row>
      //         <Mainmenu />
      //       </Grid.Row>
      //     </Grid>
      //   </Container>
      // </div>
      <form>
      <input type="number" defaultValue={ 0 } ref={ (el) => this.elements.firstValue = el }/>
      <input type="number" defaultValue={ 0 } ref={ (el) => this.elements.secondValue = el }/>
      <button type="button" className='plus' onClick={ this.onPlus }>+</button>
      <button type="button">-</button>
      <button type="button">*</button>
      <button type="button">/</button>
      <p className='result'>{ result }</p>
    </form>
    );
  }
}
export default hot(module)(App);
