import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  jwt: "",
  user: {
    accessToken: "",
    id: null,
    name: "",
    mail: "",
    phone: "",
    verified: "",
    role: "student",
    profile: "0",
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
