import Spinner from '@/components/Spinner';
import { getUserDetails } from '@/utils/getUserDetails';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
}

export const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<UserProfile>({
    name: '',
    email: '',
  });
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const { token } = JSON.parse(authData);
      getUserDetails(token)
        .then((data) => {
          setUser(data.user);
          setFormValues({ name: data.user.name, email: data.user.email }); // Set initial form values
        })
        .catch((err) => {
          setError(err.message);
          router.push('/login'); // Redirect to login if fetching user details fails
        });
    } else {
      router.push('/login'); // Redirect to login if token is not found
    }
  }, [router]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormValues({ name: user?.name || '', email: user?.email || '' });
  };

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name: formValues.name, email: formValues.email });
    }
    setEditing(false);
    // Simulate saving to the server
    // Replace with actual API call
    console.log('Profile updated:', formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
        {/* Customize size and color */}
      </div>
    ); // You can add a spinner or skeleton here
  }

  return (
    <div className="max-w-lg p-4 md:p-10 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {!editing ? (
        <div>
          <p className="text-lg font-semibold">Name: {user.name}</p>
          <p className="text-lg">Email: {user.email}</p>
          
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
