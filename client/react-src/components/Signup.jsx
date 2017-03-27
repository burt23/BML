import React from 'react';

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: '',
      pass: '',
      verify: '',
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeVerify = this.handleChangeVerify.bind(this);
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

  handleChangeVerify(event){
    this.setState({
      verify: event.target.value
    })
  }

  handleFormSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    const user = this.state.user;
    const pass = this.state.pass;
    const verify = this.state.verify;
    if(user && pass && pass === verify){
      console.log('firing handle signup form submit')
      this.props.signup(user, pass)
    }
  }

  render(){
    return(
      <div className='container'>
        <div className='formWrapper'>
          <form onSubmit={this.handleFormSubmit}>
          <h2>Sign Up</h2>
          <input type='text' placeholder='username' value={this.state.user} onChange={this.handleChangeUser}/><br/>
          <input type='password' placeholder='password' value={this.state.pass} onChange={this.handleChangePass}/><br/>
          <input type='password' placeholder='password' value={this.state.verify} onChange={this.handleChangeVerify}/><br/>
          <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    )
  }
}


export default Signup;