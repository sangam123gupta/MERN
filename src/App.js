
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter,Redirect, Route, Switch } from "react-router-dom";


import Posts from './Posts/Posts.jsx'

import AddPost from './Posts/Post/AddPost'
import EditPost from './Posts/Post/EditPost'
import SinglePost from './Posts/Post/SinglePost'

import SinglePostDetails from './Posts/Post/SinglePostDetails'

import Navbar from './Components/header/Navbar.jsx'

import Register from './Components/Auth/Register'

import Login from './Components/Auth/Login'

import Home from './Components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      


      <Navbar/>
<Switch>
      <Route exact path='/' render={(props) => <Posts {...props} />} />
          <Route exact path='/posts' render={(props) => <Redirect to='/' />} />



  <Route path='/register'>
      <Register/>


      </Route>
      
      <Route path='/login'>
      <Login/>

      </Route>




      <Route path='/addpost'                 render={(props)=> <AddPost {...props} />}>
      

      </Route>
      
      <Route path='/posts/editpost/:id'        render={(props) => <EditPost {...props} />}     >
      
      
      

      </Route>


      <Route path='/singlepost'>
      
      <SinglePost/>

      </Route>
      

      <Route path='/singlepostdetail/:id' render={(props)=> <SinglePostDetails {...props} />}>
      
      

      </Route>

      
      

     
      <Route path='/home'  render={(props) => <Home {...props} />}>
      
            
      </Route>
      

      <Posts/>


      </Switch>


    </BrowserRouter>
  );
}

export default App;
