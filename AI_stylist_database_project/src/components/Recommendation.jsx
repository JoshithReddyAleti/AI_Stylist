function Recommendation({ recommendation }) {
  if (!recommendation) return null;
  
  return (
    <div className="recommendation-box">
      <h2>Your Outfit Recommendation</h2>
      
      {recommendation.recommendation && recommendation.recommendation.outfit ? (
        <div className="outfit-recommendation">
          <div className="weather-summary">
            <p>
              <strong>Weather:</strong> {recommendation.recommendation.temperature}°C, {recommendation.recommendation.description}
            </p>
          </div>
          
          <div className="outfit-details">
            <h3>Recommended Outfit</h3>
            <div className="outfit-text">
              {recommendation.recommendation.outfit}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-recommendation">
          <p>{recommendation.recommendation?.message || "No recommendation available. Try adding more clothing items to your wardrobe."}</p>
        </div>
      )}
      
      <div className="available-clothing">
        <h3>Available Items</h3>
        
        {recommendation.availableClothing && (
          <div className="clothing-categories">
            <div className="category">
              <h4>Shirts ({recommendation.availableClothing.shirts?.length || 0})</h4>
              {recommendation.availableClothing.shirts?.length > 0 ? (
                <ul>
                  {recommendation.availableClothing.shirts.map(shirt => (
                    <li key={shirt._id}>{shirt.name} ({shirt.color})</li>
                  ))}
                </ul>
              ) : (
                <p>No suitable shirts available</p>
              )}
            </div>
            
            <div className="category">
              <h4>Pants ({recommendation.availableClothing.pants?.length || 0})</h4>
              {recommendation.availableClothing.pants?.length > 0 ? (
                <ul>
                  {recommendation.availableClothing.pants.map(pants => (
                    <li key={pants._id}>{pants.name} ({pants.color})</li>
                  ))}
                </ul>
              ) : (
                <p>No suitable pants available</p>
              )}
            </div>
            
            <div className="category">
              <h4>Outerwear ({recommendation.availableClothing.outerwear?.length || 0})</h4>
              {recommendation.availableClothing.outerwear?.length > 0 ? (
                <ul>
                  {recommendation.availableClothing.outerwear.map(item => (
                    <li key={item._id}>{item.name} ({item.color})</li>
                  ))}
                </ul>
              ) : (
                <p>No suitable outerwear available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;