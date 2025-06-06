import React, { useState } from 'react';
import '../styles/home.css';
import NavBar from '../components/NavBar';
import Feed from '../views/Feed';
import Beats from '../views/Beats';
import Radio from '../views/Radio';
import Playlists from '../views/Playlists';
import Favorites from '../views/Favorites';
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import Player from '../components/Player';
import Search from '../views/Search';
import SongCategories from '../components/Browse';

export default function Home({ username }) {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchTerm, setSearchTerm] = useState('');

  const [isSearching, setIsSearching] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };


  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      setIsSearching(true); 
    } else {
      setIsSearching(false);
    }
  };

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    
  };

  const renderView = () => {
    if (isSearching) {
      return <Search query={searchTerm} />;
    }

    switch (activeTab) {
      case 'feed':
        return <Feed onSelectSong={setCurrentSong} />;
      case 'beats':
        return <Beats onSelectSong={setCurrentSong} />;
      case 'radio':
        return <Radio onSelectSong={setCurrentSong} />;
      case 'playlists':
        return <Playlists onSelectSong={setCurrentSong} />;
      case 'favorites':
        return <Favorites onSelectSong={setCurrentSong} />;
      default:
        return <Feed onSelectSong={setCurrentSong} />;
    }
  };



  return (
    <div className="home-wrapper">
      <NavBar className='navbar' activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="home-content">
        <div className="home-header">
          <div className="left">
            <CiSearch className='icon'/>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <div className="browse">
              <SongCategories onSelectCategory={handleCategorySelect} />
            </div>
          </div>
          <div className="right">
              <GoBellFill className='icon'/>
              <FaUserCircle className='icon'/>
            <button onClick={handleLogout} className="logout-button">
              <span>Logout</span><FiLogOut />
            </button>
          </div>
          
        </div>

        <div className="main-view">
          {renderView()}
        </div>
      </div>
      <div className="right-section">
        <div className="player">
          <Player song={currentSong} />
        </div>
      </div>
    </div>
  );
}
