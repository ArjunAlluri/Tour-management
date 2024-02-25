import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Landing from "components/Landing.js"
import Places from "components/Places.js";
import Hotels from "components/Hotels.js";
import FlightSearch from "components/Flights.js";
import Footer from "components/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import Itinerary from "pages/Itinerary.js";
import SearchPlaces from "pages/Places.js";
import SearchAccommodations from "pages/Accommodations.js";
import SearchFlights from "pages/Flights.js";
import SearchExplore from "pages/Search.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/search" element={<SearchExplore />} />
          <Route exact path="/itinerary" element={<Itinerary />} />
          <Route exact path="/places" element={<SearchPlaces />} />
          <Route exact path="/accommodations" element={<SearchAccommodations />} />
          <Route exact path="/flights" element={<SearchFlights />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <AnimationRevealPage>
      <Landing />
      <Places />
      <Hotels />
      <FlightSearch />
      <Footer />
    </AnimationRevealPage>
  );
}

export default App
