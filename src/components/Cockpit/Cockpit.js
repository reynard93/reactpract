import React , { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context'

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext)

  useEffect(()=> {
    console.log('cockpit.js useEffect')
    // setTimeout(() => {
    //   alert('saved data to cloud');
    // }, 1000)
    toggleBtnRef.current.click()
    return () => {
      console.log('Cockpit.js cleanup work in useEffect')
    }
  }, [])

  useEffect(()=> {
    console.log('cockpit.js useEffect2')
    return () => {
      console.log('cockpit cleanup work in useEffect2')
    }
  })
  const assignedClasses = []
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
 
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red)
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold)
  }
  return (
    <div className={classes.Cockpit}> 
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
      ref={toggleBtnRef}
      className={btnClass}
      onClick={props.clicked}>Toggle Persons</button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
}

export default React.memo(Cockpit); 