import React from 'react';
import NavBar from './components/navbar'


const App = (props) => {
  return (
    <div>
      <NavBar />
     {props.children}
    </div>
  )

}
  // const [user, setUser] = useState('')

  

export default App;
