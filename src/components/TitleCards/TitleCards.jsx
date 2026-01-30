import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState ([]);
  const cardsRef = useRef();


  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGMwOGViMzJjM2JhNWMwOTNlMTRjMzYwODIxODU3OCIsIm5iZiI6MTc1MTczODY5Ny45NDksInN1YiI6IjY4Njk2OTQ5ZTU2YzQ3YTg0YzZlN2FlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PpT-0auu1z8PrmtcYDpke-JrQLgDS9pZtSF3a6qHwrI'
  }
};

  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));




  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

return (
  <div className='title-cards'>
    <h2>{title?title:"Popular on Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index)=>{
        return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
