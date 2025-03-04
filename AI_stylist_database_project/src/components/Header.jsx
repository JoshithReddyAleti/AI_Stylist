import { useState } from 'react';

function Header({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };
  
  return (
    <header className="app-header">
      <div className="logo" onClick={() => handleTabClick('home')}>
        AI Stylist
      </div>
      
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => handleTabClick('home')}
          >
            Home
          </li>
          <li 
            className={activeTab === 'wardrobe' ? 'active' : ''} 
            onClick={() => handleTabClick('wardrobe')}
          >
            My Wardrobe
          </li>
          <li 
            className={activeTab === 'recommendation' ? 'active' : ''} 
            onClick={() => handleTabClick('recommendation')}
          >
            Recommendations
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;