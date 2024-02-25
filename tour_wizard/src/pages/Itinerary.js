import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Itinerary = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.usertoken;
    if (!token) {
        navigate(`/login`);
    } else {
      const decoded = jwt_decode(token);
      setUserInfo(decoded.sub);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    navigate(`/login`);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">PROFILE</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{userInfo.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{userInfo.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="btn btn-lg btn-primary btn-block" onClick={handleLogout}>
                  Logout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Itinerary;
