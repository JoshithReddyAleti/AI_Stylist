import { useState } from 'react';
import { addClothing } from '../services/api';

function ClothingForm({ onClothingAdded }) {
  const initialState = {
    type: 'shirt',
    name: '',
    color: '',
    material: '',
    weatherSuitability: {
      cold: false,
      cool: false,
      mild: false,
      warm: false,
      hot: false
    },
    rainSuitable: false,
    image: ''
  };
  
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleWeatherChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      weatherSuitability: {
        ...formData.weatherSuitability,
        [name]: checked
      }
    });
  };
  
  const handleRainChange = (e) => {
    setFormData({
      ...formData,
      rainSuitable: e.target.checked
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.name || !formData.color || !formData.material) {
        throw new Error('Please fill in all required fields');
      }
      
      // Check if at least one weather condition is selected
      const hasWeatherCondition = Object.values(formData.weatherSuitability).some(value => value);
      if (!hasWeatherCondition) {
        throw new Error('Please select at least one weather condition');
      }
      
      await addClothing(formData);
      setSuccess(`${formData.name} added to your wardrobe!`);
      setFormData(initialState);
      onClothingAdded();
    } catch (err) {
      setError(err.message || 'Error adding clothing item');
      // Avoid logging the full error object
      console.error('Error in form submission:', err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="clothing-form-container">
      <h3>Add New Clothing Item</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form className="clothing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            disabled={loading}
          >
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="E.g., Blue Cotton T-shirt"
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Color:</label>
          <input 
            type="text" 
            name="color" 
            value={formData.color} 
            onChange={handleChange}
            placeholder="E.g., Blue"
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Material:</label>
          <input 
            type="text" 
            name="material" 
            value={formData.material} 
            onChange={handleChange}
            placeholder="E.g., Cotton"
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Weather Suitability:</label>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="cold" 
                checked={formData.weatherSuitability.cold} 
                onChange={handleWeatherChange}
                disabled={loading}
              />
              Cold (below 5°C)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                name="cool" 
                checked={formData.weatherSuitability.cool} 
                onChange={handleWeatherChange}
                disabled={loading}
              />
              Cool (5-15°C)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                name="mild" 
                checked={formData.weatherSuitability.mild} 
                onChange={handleWeatherChange}
                disabled={loading}
              />
              Mild (15-22°C)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                name="warm" 
                checked={formData.weatherSuitability.warm} 
                onChange={handleWeatherChange}
                disabled={loading}
              />
              Warm (22-28°C)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                name="hot" 
                checked={formData.weatherSuitability.hot} 
                onChange={handleWeatherChange}
                disabled={loading}
              />
              Hot (above 28°C)
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              name="rainSuitable" 
              checked={formData.rainSuitable} 
              onChange={handleRainChange}
              disabled={loading}
            />
            Suitable for rainy weather
          </label>
        </div>
        
        <div className="form-group">
          <label>Image URL (optional):</label>
          <input 
            type="text" 
            name="image" 
            value={formData.image} 
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add to Wardrobe'}
        </button>
      </form>
    </div>
  );
}

export default ClothingForm;