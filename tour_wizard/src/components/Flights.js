import React, {useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../images/dot-pattern.svg"
import axios from "axios";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./Header.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-black hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const PrimaryAction = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const Container_1 = tw.div`relative bg-primary-500 text-gray-100 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
const Content_1 = tw.div`max-w-screen-xl mx-auto relative z-10`;
const FiveColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column_1 = tw.div`px-4 sm:px-0 sm:w-1/3 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-100 pb-1 transition duration-300`;

const Divider = tw.div`my-16 border-b-2 border-primary-400 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-100`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-400`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute top-0 left-0 w-80 h-80 transform -translate-x-20 -translate-y-32 text-primary-700 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 right-0 w-80 h-80 transform  translate-x-32 translate-y-48 text-primary-700 opacity-50`;

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`
const StyledDateInput = tw.input`border border-gray-400 p-2 rounded`;

const FlightTable = ({data}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Flight Number</th>
          <th>Departure Time</th>
          <th>Arrival Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((flight, index) => (
          <tr key={index}>
            <td>{flight.Airline.Name}</td>
            <td>{flight.Airline.FlightNumber}</td>
            <td>{flight.Departure.Time}</td>
            <td>{flight.Arrival.Time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default () => {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);

  const dateObj = new Date(date);
  const outputDate = dateObj.getFullYear() + 
                   ("0" + (dateObj.getMonth() + 1)).slice(-2) + 
                   ("0" + dateObj.getDate()).slice(-2);
  console.log(from, to, outputDate);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://timetable-lookup.p.rapidapi.com/TimeTable/${from}/${to}/${outputDate}`, {
      headers: {
        'X-RapidAPI-Key': 'eac702fd68mshb4a04200e0340c6p16d445jsn219e7d6bd447',
        'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
      }
    })
    .then(response => {
      console.log(response.data);
      setData(response.data);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const flightDetails = xmlDoc.getElementsByTagName("FlightDetails");
      const flights = Array.from(flightDetails).map((flight) => {
        return {
          totalFlightTime: flight.getAttribute("TotalFlightTime"),
          totalMiles: flight.getAttribute("TotalMiles"),
          totalTripTime: flight.getAttribute("TotalTripTime"),
          departureDateTime: flight.getAttribute("FLSDepartureDateTime"),
          departureCode: flight.getAttribute("FLSDepartureCode"),
          departureName: flight.getAttribute("FLSDepartureName"),
          arrivalDateTime: flight.getAttribute("FLSArrivalDateTime"),
          arrivalCode: flight.getAttribute("FLSArrivalCode"),
          arrivalName: flight.getAttribute("FLSArrivalName"),
          flightType: flight.getAttribute("FLSFlightType"),
          flightLegs: flight.getAttribute("FLSFlightLegs"),
          flightDays: flight.getAttribute("FLSFlightDays"),
        };
      });
      setFlights(flights)
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
    <Container>
    
      <Content>
        <FormContainer>
        <div>
      <form onSubmit={handleSubmit}>
        <TwoColumn>
          <Column>
            <InputContainer>
              <Label htmlFor="leaving-from">Leaving From</Label>
              <Input id="leaving-from" type="text" name="leaving-from" placeholder="E.g. Indianapolis" onChange={(e) => setFrom(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="going-to">Going To</Label>
              <Input id="going-to" type="text" name="going-to" placeholder="E.g. New York" onChange={(e) => setTo(e.target.value)} />
            </InputContainer>
          </Column>
          <Column>
            <InputContainer>
              <Label htmlFor="departing">Departing</Label>
              <StyledDateInput type="date" name="departing" id="departing" placeholder="Select a date" onChange={(e) => setDate(e.target.value)} />
            </InputContainer>
          </Column>
        </TwoColumn>

        <SubmitButton type="submit" value="Search">Search</SubmitButton>
      </form>
    </div>
    
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
    <Container_1>
      <Content_1>
        <FiveColumns>
          <Column_1>
            <ColumnHeading>Departure</ColumnHeading>
          </Column_1>
          <Column_1>
            <ColumnHeading>Arrival</ColumnHeading>
          </Column_1>
          <Column_1>
            <ColumnHeading>Flight Time</ColumnHeading>
          </Column_1>
          <Column_1>
            <ColumnHeading>Total Miles</ColumnHeading>
          </Column_1>
          <Column_1>
            <ColumnHeading></ColumnHeading>
          </Column_1>
        </FiveColumns>
        {flights.slice(0, 10).map((flight, index) => (
          <FiveColumns key={index}>
            <Column_1>
            <ColumnHeading>{flight.departureName} ({flight.departureCode})<br />
              {flight.departureDateTime}</ColumnHeading>
            </Column_1>
            <Column_1>
            <ColumnHeading>{flight.arrivalName} ({flight.arrivalCode})<br />
              {flight.arrivalDateTime}</ColumnHeading>
            </Column_1>
            <Column_1><ColumnHeading>{flight.totalFlightTime}</ColumnHeading></Column_1>
            <Column_1><ColumnHeading>{flight.totalMiles}</ColumnHeading></Column_1>
            <Column_1>
            <PrimaryAction><ColumnHeading>Add to Itinerary</ColumnHeading></PrimaryAction>
            </Column_1>
          </FiveColumns>
        ))}
      </Content_1>
    </Container_1>
    </>
  );
};
