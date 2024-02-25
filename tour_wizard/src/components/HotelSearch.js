import React, { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import tw from "twin.macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
const PlaceComponent = () => {
  const inputRef = useRef();
  const [placeDetails, setPlaceDetails] = useState(null);

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails(
        {
          placeId: place.place_id,
          fields: ["name", "formatted_address", "photos", "rating", "reviews"],
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlaceDetails(result);
          }
        }
      );
    }
  };

  const Card = tw.div`h-128 flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none items-center justify-center`;
  const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-72 sm:h-72 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

  const TextInfo = tw.div`py-2 sm:px-2 sm:py-2`;
  const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
  const Title = tw.h6`text-xl font-bold`;

const RatingsInfo = styled.div`
${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
svg {
  ${tw`w-6 h-6 text-yellow-500 fill-current`}
}
`;
const Rating = tw.span`ml-2 text-xl font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
svg {
  ${tw`w-3 h-3`}
}
`;
const Text = tw.div`ml-2 text-sm font-semibold`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

  return (
    <LoadScript googleMapsApiKey={'AIzaSyCIL-3nA4ba7YuGN_X4Nsbe3ib2FMxy-kY'} libraries={["places"]}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search for a place you want to stay in"
          style={{ 
            borderRadius: "20px", 
            padding: "10px 20px", 
            fontSize: "2rem", 
            width: "40rem",
            color: "#333"
          }}
        />
      </StandaloneSearchBox>
      {placeDetails && (
        // <div>
        //   <h1>{placeDetails.name}</h1>
        //   {placeDetails.photos && (
        //     <img src={placeDetails.photos[0].getUrl()} alt="Place" />
        //   )}
        //   <p>{placeDetails.formatted_address}</p>
        //   <p>Rating: {placeDetails.rating}</p>
        //   {placeDetails.reviews &&
        //     placeDetails.reviews.map((review) => (
        //       <div key={review.time}>
        //         <p>{review.text}</p>
        //         <p>By: {review.author_name}</p>
        //       </div>
        //     ))}
        // </div>
        <>
        <Card>
              <CardImage imageSrc={placeDetails.photos[0].getUrl()} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{placeDetails.name}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{placeDetails.rating}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{placeDetails.formatted_address}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{}</Description>
              </TextInfo>
              <PrimaryButton>Add to Itinerary</PrimaryButton>
            </Card>
            </>
      )}
    </LoadScript>
  );
};

export default PlaceComponent;