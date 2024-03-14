import { useEffect, useState } from 'react';
import './App.css';
import {getMovieList, searchMovie} from './api'

 const App = () => {
  const [popularMovie ,setPopularMovie] = useState([])
  const [isNotif, setIsNotif] = useState(false)

  useEffect(() => {
      getMovieList().then((results) => {
      setPopularMovie(results)
    })
  },[])

  const notif = () => {
    setIsNotif(!isNotif)
    // setTimeout(() => {
    //   setIsNotif((state) => !state )
    // }, 2000)
  }

  // console.log({ isNotif })

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
          <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`} alt="" className="Movie-img" />
            <div className="Movie-date">release : {movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if(q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovie(query.results)
    }
  }

  return (
    <div className="App">
      {isNotif && <h3>puhehehehehe</h3>}
      <button onClick={notif} className='btn'>
        {isNotif ? "notifikasi OFF" : "notifikasi ON"}
      </button>
      <header className="App-header">
      <h1>Esyeha Movie DB</h1>
        <input
         placeholder='Cari Film Kesayangan...' 
         className='Movie-search'
         onChange={({target}) => search(target.value)}
         />
          <div className="Movie-container">
          <PopularMovieList/>
        </div>
      </header>
    </div>
  )
  }

export default App
