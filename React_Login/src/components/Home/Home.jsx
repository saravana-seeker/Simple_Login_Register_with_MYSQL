import React from 'react';
import {Link} from 'react-router-dom';

// https://www.freecodecamp.org/news/react-router-tutorial/
function Home() {
  return (
    <div>
        <div className="home">
            <div className="container p-5">
                <div className="card">
                    <div className="card-header"></div>
                    <div className="card-body">
                        <h4>Simple Login and SignUp</h4>
                        <Link to='/login'> <button className='btn btn-primary m-4'> Login</button><br /></Link>
                        <Link to='/signup'><button className='btn btn-primary m-2'>SignUp</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home