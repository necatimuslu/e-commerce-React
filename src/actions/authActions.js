import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:5040/auth/create-update",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const currentUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:5040/auth/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const adminUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:5040/auth/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
