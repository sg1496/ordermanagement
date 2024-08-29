import { jwtDecode } from "jwt-decode";

const verifyToken = (token = localStorage.getItem("token")) => {
  try {
    const secretKey = 'E9DB7E89123F52A9F2DB04EF04C7FE88';
    const currentTime = Math.floor(Date.now() / 1000);
    const decoded = jwtDecode(token, secretKey);

    if (decoded.exp < currentTime) {
      return false;
    } else {
      return decoded;
    }
  } catch (error) {
   {!token ? "" : console.error('Token verification failed:', error);}
    return null;
  }
};

export default verifyToken;