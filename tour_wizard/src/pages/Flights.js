import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Landing from "components/Landing.js"
import Places from "components/Places.js";
import Hotels from "components/Hotels.js";
import FlightSearch from "components/Flights.js";
import Footer from "components/Footer.js";
import PlaceComponent from "components/CitySearch.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../components/Header.js";
import tw from "twin.macro";
import styled from "styled-components";
import Landing_citiies from "components/Landing_citiies.js"
import Flights from "components/Flights.js"

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black hover:border-black hover:text-black`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;


export default () => {
  return (
	<AnimationRevealPage>
    <StyledHeader />
    <FlightSearch />
     <Footer />
    </AnimationRevealPage>
  );
};