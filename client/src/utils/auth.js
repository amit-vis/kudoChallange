import {jwtDecode} from 'jwt-decode';

export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp > currentTime; // Check if token is expired
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};
