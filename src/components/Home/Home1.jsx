// Home1.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the useCart hook
import './Home.css';
import NavBar from './Navbar';
import baseUrl from '../../Api';
import SearchBar from './Searchbar';
import Imgslider from './Imgslider';


const Home1 = () => {
  const [petList, setPetList] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the useCart hook

  

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
        navigate('/login');
    } else {
        console.log('Token fetched:', token);
        // Extract the payload from the token
        const payload = token.split('.')[1];
        try {
            const decodedPayload = atob(payload);
            const { userId } = JSON.parse(decodedPayload); // Extract userId from the decoded payload
            console.log('User Id:', userId);

            // Fetch user data using the API endpoint
            axios
            .get(baseUrl + `/signup/user/${userId}`) // Use backticks for template literals
            .then((response) => {
                const userData = response.data.user;
                console.log('User Data:', userData);
                setUsername(userData.username);
                setEmail(userData.email);
            })
                .catch((err) => console.log(err));
        } catch (error) {
            console.error('Error decoding token payload:', error);
        }
    }
    axios
      .get(baseUrl + '/pet/tfetch')
      .then((response) => {
        console.log(response.data);
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  }, [trigger]);

  const handleSearch = () => {
    axios
      .get(baseUrl + `/pet/tsearch/${searchTerm}`)
      .then((response) => {
        console.log(response.data);
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = (pet) => {
    addToCart(pet); // Add the pet to the cart using the addToCart function
    console.log('Adding pet to cart:', pet);
    navigate('/cart');
  };

  return (
    <div className="home-page">
      <NavBar />
      <Imgslider/>
      
      <div className="welcome-section">
      <h1>Welcome {username} to PAWSHUB</h1>
        <p>Find your new furry friend with us!</p>
      </div>

      {/* <SearchBar onSearch={handleSearch} /> */}


      <div className="featured-pets-section">

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

        <h2>Featured Pets</h2>
        <div className="featured-pets">
          {petList ? (
            petList.map((pet) => (
              <div key={pet.id} className="featured-pet-card">
                <img src={`data:${pet.Image.contentType};base64,${pet.Image.data}`} alt="petImage" />
                <h3>{pet.PetName}</h3>
                <p>{pet.Breed}</p>
                <button onClick={() => handleAddToCart(pet)}>Add to Cart</button>
                <br></br>
                <br></br>
                <br></br>
                <button>View Details</button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home1;
