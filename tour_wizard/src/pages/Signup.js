import React, { useState } from 'react';
import { register } from 'components/UserFunction';
import { useNavigate } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;
function Register() {
  
  const navigate = useNavigate();
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
    };

    register(newUser).then((res) => {
      if (res.result.error) {
        // show error popup
        alert(res.result.error);
      } else {
        // success, do something else
        console.log(res);
      }
    });
  };
  
  return (
    <AnimationRevealPage>
      <Container>
      <Content>
        <MainContainer>
        <LogoLink href={"#"}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{"Sign Up For TourWizard"}</Heading>
            <FormContainer>
            <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer>
              <Form noValidate onSubmit={handleSubmit}>
              <Input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter First Name"
                value={state.first_name}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter Last Name"
                value={state.last_name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={state.email}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={state.password}
                onChange={handleInputChange}
              />
              <SubmitButton type="submit">
                  <span className="text">{"Sign Up"}</span>
              </SubmitButton>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by TourWizards's{" "}
                  <a href={"#"} tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href={"#"} tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href={"\login"} tw="border-b border-gray-500 border-dotted">
                    Log In
                  </a>
                </p>
              </Form>
    
    </FormContainer>
    </MainContent>
    </MainContainer>
    </Content>
    </Container>
    {/* <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter First Name"
                value={state.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter Last Name"
                value={state.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={state.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={state.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div> */}
    </AnimationRevealPage>
    
  );
}

export default Register;


