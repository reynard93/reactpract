import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import Aux from '../hoc/Auxilliary'
import withClass from '../hoc/withClass'
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor(props) {
    super(props) //calls the constructor of the component you are extending
    console.log('App.js constructor')
  }
  state = {
    persons: [
      { id: 'asdas',name: 'Max', age: 28, clickP: ['MANULLION', undefined, undefined] },
      { id: '21231',name: 'Manu', age: 29, clickP: ['SephtlionN', undefined, undefined] },
      { id: 'cvcsds',name: 'Stephanie', age: 26, clickP: ['SUVCKSER', undefined, undefined] }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[app.js getDerivedStateFromProps',props);
    return state;
  }

  componentDidMount() {
    console.log('app.js componentdidmount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App.js shouldcomponentupdate')
    return true
  }

  componentDidUpdate() {
    console.log('app.js componentdidupdate')
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person;
    //impt to user functions when u are depending on previous state since object for setstate is called synchronously
    this.setState((prevState, props) => {
     return{
      persons: persons,
      changeCounter: prevState.changeCounter + 1
     } 
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  } 

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render() {
    console.log('app.js render')
    let persons = null

    if (this.state.showPersons) { //key alawys has to be on a outer element
      persons = ( 
      <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangedHandler} isAuthenticated={this.state.authenticated}/>
      );
 
    }


    return (
        <Aux>
          <button onClick={() => this.setState({showCockpit: false })}>Remove Cockpit</button> 
          <AuthContext.Provider value={{authenticated: this.state.authenticated,  login: this.loginHandler}}> {/* changing in a context obj will not trigger rerendering*/}
            {this.state.showCockpit? <Cockpit
              title={this.props.appTitle} 
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            /> : null}
            {persons}
          </AuthContext.Provider> 
        </Aux>

    );
 
  }
}

export default withClass(App, classes.App );
