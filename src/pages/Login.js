import React ,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
  const [credentials, setcredentials] = useState({email: "", password: ""})

  let navigate=useNavigate();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Creds");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken",json.authToken));
      navigate('/');
    }
    
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div className='container'>

            <form onSubmit={handleSubmit}>
           
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}id="exampleInputPassword1"/>
                </div>
                
                New User?<Link to="/signup" className='m-3'>Register</Link>
                <button type="submit" className="btn btn-success">Login</button>
                
            </form>
        </div>
  )
}

export default Login