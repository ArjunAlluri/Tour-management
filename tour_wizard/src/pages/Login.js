import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'components/UserFunction';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/logo.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import GoogleLogin from "react-google-login";
import { setUser, setToken } from './auth.js';

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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const handleGoogleLoginSuccess = async (response) => {
  try {
    const tokenId = response.tokenId;

    // Send the tokenId to your Flask backend to obtain the user's information
    const res = await fetch('/api/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tokenId })
    });

    if (res.ok) {
      const data = await res.json();
      
      // Save the user information to state or cookies
      // For example:
      setUser(data.user);
      setToken(data.token);
    } else {
      console.error(res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleGoogleLoginFailure = (error) => {
  <AnimationRevealPage>
    <Container>
      <Content>
        <p>Login Failure</p>
      </Content>
    </Container>
  </AnimationRevealPage>
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    }

    login(user).then(res => {
      if (!res.error) {
        navigate(`/search`);
      }
    })
  }

  return (
    <AnimationRevealPage>
       <Container>
       <Content>
       <MainContainer>
          <LogoLink href={"#"}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
          <Heading>{"Log In To TourWizard"}</Heading>
          <FormContainer>
              <SocialButtonsContainer>
              <GoogleLogin
                  clientId={'712811281830-3d3lukn1il3895t60ic7ljtbuu0ql87b.apps.googleusercontent.com'}
                  buttonText="Log In With Google"
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Log In with your e-mail</DividerText>
              </DividerTextContainer>
              <Form noValidate onSubmit={onSubmit}>
              <Input type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <Input type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <SubmitButton type="submit">
                  <span className="text">{"Log In"}</span>
                </SubmitButton>           
              </Form>
              <p tw="mt-6 text-xs text-gray-600 text-center">
                <a href={"#"} tw="border-b border-gray-500 border-dotted">
                  Forgot Password ?
                </a>
              </p>
              <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href={"\signup"} tw="border-b border-gray-500 border-dotted">
                  Sign Up
                </a>
              </p>
          </FormContainer>
          </MainContent>
        </MainContainer>
       </Content>
       </Container>
    </AnimationRevealPage>

    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-6 mt-5 mx-auto">
    //       <form noValidate onSubmit={onSubmit}>
    //         <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
    //         <div className="form-group">
    //           <label htmlFor="email">Email Address</label>
    //           <input type="email"
    //             className="form-control"
    //             name="email"
    //             placeholder="Enter Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)} />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="password">Password </label>
    //           <input type="password"
    //             className="form-control"
    //             name="password"
    //             placeholder="Enter Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)} />
    //         </div>

    //         <button type="submit" className="btn btn-lg btn-primary btn-block">
    //           Sign in
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Login;

