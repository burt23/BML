import React from 'react';

class Song extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.handleUserClicked = this.handleUserClicked.bind(this);
  }

  handleUserClicked(event){
    event.preventDefault();
    console.log('inside handleUserClicked');
    console.log(event.target.value);
    this.props.send({
      value: '5',
      address: 'SVV2aSwhrtBVtBWbRa7oUQSH6MFJrg8sSn'
    })

  }


  render(){
    return(
      <div className='song'>
        <div className='flexRow'>

          <div className='rowInner'>
            <h2> Artist: {this.props.song.artist} </h2>
            <h3> Album: {this.props.song.album} </h3>
            <h4> Song: {this.props.song.song} </h4>
          </div>

          <div className='rowInner'>
            <h4>Sampling Use</h4>
            <p>Incorporate a portion of the song in your own music.</p>

            <div>
              <form onSubmit={this.handleUserClicked}>
              <h4> 0.45BTC </h4>
              <button type='button' onClick={this.handleUserClicked} value='5'>Purchase</button>
              </form>
            </div>
          </div>

          <div className='rowInner'>
            <h4>Commercial use</h4>
            <p>Use for commercial purposes, such as in advertising.</p>
           <div>
             <h4> 1BTC </h4>
             <button type='button' onClick={this.handleUserClicked} value='5'>Purchase</button>
           </div>
          </div>

          <div className='rowInner'>
            <h4>Exclusive use</h4>
            <p>Use exclusively. Once you buy exclusive rights, no one else will be able to purchase the song.</p>
            <div>
              <h4> 20BTC </h4>
              <button type='button' onClick={this.handleUserClicked} value='20'>Purchase</button>
            </div>
          </div>

        <div className='rowInner'>
          <iframe width="100%" height="150" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/314456196%3Fsecret_token%3Ds-ALchc&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true">
          </iframe>
        </div>

      </div>
    </div>
    )
  }
}

export default Song;