import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
  constructor(props){
    super(props)
    this.state= {...this.props}
  }
  static getDerivedStateFromProps(props, state) {
    console.log('Persons.js getDerivedStateFromProps')
    return state
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('persons.js shouldcomponentupdate')
  //   if (nextProps.persons !== this.props.persons) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Persons.js getSnapshotbeforeupdate')
    return {message: 'Snapehost!'};
  }

  componentDidUpdate(prevProps,prevState, snapshot) {
    console.log('Persons.js componentDidUpdate')
    console.log(snapshot)
  }

  componentWillUnmount() {
    console.log('Persons.js componentwillunmount')
  }

  render() {
    console.log('Persons.js rendering...')
    return this.props.persons.map((person, index) => {
        return (
        <Person 
          key = {person.id}
          name = {person.name}
          age = {person.age}
          click = {() => this.props.clicked(index)}
          change = {(event) => this.props.changed(event, person.id)}
          /> 
          );
  })
  }
}
  export default Persons;