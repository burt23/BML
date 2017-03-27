import React from 'react';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: '',
      pass: '',
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleChangeUser(event){
    this.setState({
      user: event.target.value
    })
  }

  handleChangePass(event){
    this.setState({
      pass: event.target.value
    })
  }


  handleFormSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    const user = this.state.user;
    const pass = this.state.pass;
    if(user && pass){
      console.log('form firing for submitLoginRequest')
      this.props.login(user, pass);
    }
  }

  render(){
      return(
      <div className='container'>
        <div className='formWrapper'>
          <form onSubmit={this.handleFormSubmit}>
          <h2>Login</h2>
          <input type='text' placeholder='username' value={this.state.user} onChange={this.handleChangeUser}/><br/>
          <input type='password' placeholder='password' value={this.state.pass} onChange={this.handleChangePass}/><br/>
          <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}


export default Login;