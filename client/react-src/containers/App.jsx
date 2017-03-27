import React, { PropTypes } from 'react';
import SongList from './songList.jsx';
import $ from 'jquery';
import bcoin from 'bcoin';
import Login from '../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import {reqProps} from '../../utils/utils.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userWantsHome: true,
      userWantsMoreInfo: false,
      userWantsLogin: false,
      userWantsSignup: false,
      user_id: '',
      transaction_history: [],
      transactionSuccess: false,
      balance: 5.4,
      address: '',
      user: ''
    };
    this.handleUserWantsMoreInfo = this.handleUserWantsMoreInfo.bind(this);
    this.handleUserWantsLogin = this.handleUserWantsLogin.bind(this);
    this.handleUserWantsSignup = this.handleUserWantsSignup.bind(this);
    this.handleUserWantsHome = this.handleUserWantsHome.bind(this);
    this.login = this.login.bind(this);
    this.send = this.send.bind(this);
    this.signup = this.signup.bind(this);
    this.wallet = this.wallet.bind(this);
    this.getWallet = this.getWallet.bind(this);
  }

  componentDidMount(){

  }

  handleUserWantsMoreInfo(event){
    this.setState({
      userWantsMoreInfo: true,
      userWantsHome: false,
      userWantsLogin: false,
      userWantsSignup: false
    })
  }

  handleUserWantsLogin(event){
    this.setState({
      userWantsMoreInfo: false,
      userWantsHome: false,
      userWantsLogin: true,
      userWantsSignup: false
    })
  }

  handleUserWantsSignup(event){
    this.setState({
      userWantsLogin: false,
      userWantsHome: false,
      userWantsLogin: false,
      userWantsSignup: true
    })
  }


  handleUserWantsHome(event){
    this.setState({
      userWantsMoreInfo: false,
      userWantsHome: true,
      userWantsLogin: false,
      userWantsSignup: false
    })
  }

  //HANDLE USER LOGIN
  login(user, pass){
    var context = this;

      $.ajax({
      url: 'http://localhost:5000/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        user: user,
        pass: pass
      }),
      success: function(data){
        console.log('response from ajax login',data);
        context.setState({
          user_id: data.user_id,
          transaction_history: data.transaction_history,
          userWantsLogin: false,
          userWantsHome: true,
          userWantsMoreInfo: false,
          userWantsSignup: false
        }, context.getWallet)
      },

      error: function(error){
        console.log(error);
      }
    })
  }

  signup(user, pass){
    const context = this;
    console.log(user)
    console.log(pass)

      $.ajax({
      url: 'http://localhost:5000/signup',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        user: user,
        pass: pass
      }),
      success: function(data){
        console.log('success from signupAJAx', data);
        context.setState({
          user_id: data.user_id,
          userWantsLogin: false,
          userWantsHome: true,
          userWantsSignup: false,
          userWantsMoreInfo: false,
          user: user
        }, context.wallet(user, pass))

      },
      error: function(error){
        console.log(error);
      }
    })
  }

  getWallet(){
    const context = this;
    console.log('inside get wallet')

      $.ajax({
      url: 'http://localhost:5000/node/wallet/' + this.state.user,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        user_id: this.state.user_id,
      }),
      success: function(data){
        console.log('success from signupAJAx', data);
        console.log('dataa', data.account.receiveAddress);
        context.setState({
          user_id: data.user_id,
          userWantsLogin: false,
          userWantsHome: true,
          userWantsSignup: false,
          userWantsMoreInfo: false,
          balance: data.state.coin,
          address: data.account.receiveAddress
        })

      },
      error: function(error){
        console.log(error);
      }
    })
  }

  //CREATE WALLET
  wallet(user, pass){
    console.log('inside createWallet');
    console.log('user', user);
    console.log('password', pass);
    var context = this;
    $.ajax({
      url: 'http://localhost:5000/node/wallet/' + user,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        user_id: this.state.user_id,
        address: this.state.address
      }),
      success: function(data){
        console.log('made wallet', data)
        console.log('made walletAJAX', data.account.receiveAddress)
        console.log('made walletAJAXCOIN', data.state.coin)
        context.setState({
          address: data.account.receiveAddress,
          balance: data.state.coin
        })
      },
      error: function(error){
        console.log('errorAJAZ', error);
      }
    })
  }




  //HANDLE TRANSACTION
  send(key){
    var context = this;
      $.ajax({
      url: 'http://localhost:5000/node/wallet/primary/send',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        rate: 30000,
        outputs: [{
          value: '0.5',
          address: 'SVV2aSwhrtBVtBWbRa7oUQSH6MFJrg8sSn'
        }]
      }),
      success: function(data){
        console.log(data);
        context.setState({
          transactionSuccess: true
        })
      },
      error: function(error){
        console.log(error);
      }
    })
  }

  render(){

    if(this.state.userWantsHome){
      return(
        <div className="container" role="main">

          <div className="top">

          <div className='buttonFlex'>
            <span className='topButtonLeft'><input type='button' value='About' onClick={this.handleUserWantsMoreInfo}/>
            </span>
            {this.state.user_id === '' ? (

              <span className='topButtonRight'><input type='button' value='Login' onClick={this.handleUserWantsLogin}/>
            </span> ) : (
            <div>
              <h4>Account Bal: {this.state.balance}</h4>
              <h4>Add funds: {this.state.address}</h4>
            </div>
            )}

          </div>


            <h1>BLOCKCHAIN<br/>
            MUSIC<br/>
            LABEL</h1>

            <h3>the platfrom for music labels, businesses and blockchain</h3>

          </div>

          <div className="space">
          </div>

          <SongList send={this.send}/>
        </div>
      )
    } else if (this.state.userWantsMoreInfo){
      return(
        <div className='container'>
          <div className='top'>
            <div className='buttonFlex'>
              <span className='topButtonLeft'><input type='button' value='Home' onClick={this.handleUserWantsHome}/>
              </span>
              <span className='topButtonRight'><input type='button' value='Login' onClick={this.handleUserWantsLogin}/>
              </span>
            </div>

            <h1>BLOCKCHAIN<br/>
            MUSIC<br/>
            LABEL</h1>

            <h3>the platfrom for music labels, businesses and blockchain</h3>

          </div>

          <div className="space">
          </div>

          <div className='aboutWrapper'>
            <h2> About Us </h2><hr/>
            <h4> Who We Are </h4><br/>
            <p>We are a couple of entrepreneurs in the San Francisco Bay Area who are passionate about music, and are working towards creating more opportunities for independent music labels to license their music.</p><br/>
            <h4>Our Mission</h4>
            <p>Our mission is to increase visibility and transparency in the fragmented music business by connecting independent music labels and businesses. By combining smart contracts with the security and traceability of blockchain, we will empower artists and disrupt the music industry.
            </p>

          </div>
        </div>
        )
    } else if(this.state.userWantsLogin){
    return(
        <div className='container'>
        <div className="top">
          <div className='buttonFlex'>
            <span className='topButtonLeft'><input type='button' value='Home' onClick={this.handleUserWantsHome}/>
            </span>
            <span className='topButtonRight'><input type='button' value='Signup' onClick={this.handleUserWantsSignup}/>
            </span>
          </div>

          <h1>BLOCKCHAIN<br/>
          MUSIC<br/>
          LABEL</h1>

          <h3>the platfrom for music labels, businesses and blockchain</h3>

        </div>

        <div className="space">
        </div>
          <Login login={this.login} wantsHome={this.handleUserWantsHome}/>
        </div>
      )
    } else if(this.state.userWantsSignup){
      return(
        <div className='container'>
        <div className="top">
          <div className='buttonFlex'>
            <span className='topButtonLeft'><input type='button' value='Home' onClick={this.handleUserWantsHome}/>
            </span>
            <span className='topButtonRight'><input type='button' value='Login' onClick={this.handleUserWantsLogin}/>
            </span>
          </div>

          <h1>BLOCKCHAIN<br/>
          MUSIC<br/>
          LABEL</h1>

          <h3>the platfrom for music labels, businesses and blockchain</h3>

        </div>

        <div className="space">
        </div>
          <Signup signup={this.signup} wantsHome={this.handleUserWantsHome}/>
        </div>
      )
    }

  }
}

export default App;
