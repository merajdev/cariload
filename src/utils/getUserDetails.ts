import axios from 'axios';

export const getUserDetails = async (token: string) => {
  try {
    const response = await axios.get('/api/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
};
