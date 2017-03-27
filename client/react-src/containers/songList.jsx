import React from 'react';
import Song from '../components/Song.jsx'

class SongList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs:  [
      {
        artist: 'Doublethink',
        label: 'Haustronaut',
        song: 'Pugilism',
        genre:'Tech house',
        album:'Greatest Ever',
        sample: 0.45,
        commercial: 2.3,
        exclusive: 18.4,
        sample: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/314456196%3Fsecret_token%3Ds-ALchc&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>'
      },
      {
        artist:'Motoe Haus',
        label: 'Haustronaut',
        song: 'Stand',
        genre: 'Techno',
        album: 'Best songs'
      },
      {
        artist: 'Jonnie King',
        label: 'Haustronaut',
        song: 'Analogic',
        genre: 'Techno',
        album: 'My Ibiza'
      },
      {
        artist: 'Marlon Klann',
        label: 'Haustonaut',
        song: 'High Funk',
        genre: 'Techno',
        album: 'Impact VOL'
      }]
    }
  }

  // composeInput = ({ artist, label, song, genre, album }) => (
  //   <Songs
  //     artist={artist}
  //     label={label}
  //     song={song}
  //     genre={genre}
  //     album={album}
  //     key={name}
  //   />
  // );


  render(){
    return(
      <div>
        <ul>
        {this.state.songs.map(song=>
          <li key={song.song}><Song send={this.props.send} song={song}/></li>
        )}
        </ul>
      </div>
    )
  }
}

export default SongList;