import React from 'react'

const authContext = React.createContext({authenticated: false, login: () => {}}) //wherte the object contains the state u need actually optional is for autocorrect convenience

export default authContext;