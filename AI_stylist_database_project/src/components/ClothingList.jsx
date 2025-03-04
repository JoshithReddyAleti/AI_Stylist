import { useState, useEffect } from 'react';
import { fetchAllClothing, deleteClothing } from '../services/api';

function ClothingList({ onClothingUpdated }) {
  const [clothing, setClothing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    loadClothing();
  }, []);
  
  const loadClothing = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchAllClothing();
      setClothing(data);
    } catch (err) {
      // Use the error message string instead of the full error object
      setError('Error loading your wardrobe. Please try again.');
      // Avoid logging the full error object
      console.error('Error loading clothing:', err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteClothing(id);
        setClothing(clothing.filter(item => item._id !== id));
        onClothingUpdated();
      } catch (err) {
        setError('Error deleting item. Please try again.');
        // Avoid logging the full error object
        console.error('Error deleting clothing:', err.message || 'Unknown error');
      }
    }
  };
  
  const filteredClothing = filter === 'all' 
    ? clothing 
    : clothing.filter(item => item.type === filter);
  
  const getWeatherSuitabilityText = (weatherSuitability) => {
    return Object.entries(weatherSuitability)
      .filter(([_, value]) => value)
      .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(', ');
  };
  
  if (loading) return <div className="loading">Loading your wardrobe...</div>;
  
  return (
    <div className="clothing-list-container">
      <div className="clothing-filter">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'shirt' ? 'active' : ''} 
          onClick={() => setFilter('shirt')}
        >
          Shirts
        </button>
        <button 
          className={filter === 'pants' ? 'active' : ''} 
          onClick={() => setFilter('pants')}
        >
          Pants
        </button>
        <button 
          className={filter === 'outerwear' ? 'active' : ''} 
          onClick={() => setFilter('outerwear')}
        >
          Outerwear
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {filteredClothing.length === 0 ? (
        <div className="empty-wardrobe">
          {filter === 'all' 
            ? 'Your wardrobe is empty. Add some clothing items!' 
            : `No ${filter} items in your wardrobe.`}
        </div>
      ) : (
        <div className="clothing-grid">
          {filteredClothing.map(item => (
            <div key={item._id} className="clothing-card">
              {item.image ? (
                <div className="clothing-image">
                  <img src={item.image} alt={item.name} />
                </div>
              ) : (
                <div className="clothing-image placeholder">
                  <div className="placeholder-text">{item.type.charAt(0).toUpperCase()}</div>
                </div>
              )}
              
              <div className="clothing-details">
                <h4>{item.name}</h4>
                <p><strong>Type:</strong> {item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Material:</strong> {item.material}</p>
                <p><strong>Weather:</strong> {getWeatherSuitabilityText(item.weatherSuitability)}</p>
                {item.rainSuitable && <p className="rain-suitable">Rain Suitable</p>}
              </div>
              
              <button 
                className="delete-button" 
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClothingList;