import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Person.css'
import Aux from '../../../hoc/Auxilliary'
import withClass from '../../../hoc/withClass'
import AuthContext from '../../../context/auth-context'

class Person extends Component {
  constructor(props){
    super(props)
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  //runs after render
  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    console.log('person.js rendering...')
    return (
        <Aux>
          {this.context.authenticated? <p>Authenticated!</p> : <p>Please log in</p>}
          <p onClick={this.props.click}>I'm {this.props.name} and i am {this.props.age}</p>
          <input type="text" onChange={this.props.change} ref={this.inputElementRef} value={this.props.name}></input>
        </Aux>
      )
  }
} 

Person.propTypes = {
  click: PropTypes.func   
};

export default withClass(Person, classes.Person)
