import axios from 'axios';

const api = axios.create({
  baseURL: process.env.DOMAIN, // Use the environment variable
});

export async function getUserDetails(token: string) {
  try {
    const response = await api.get('/api/auth/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data.u)
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}
