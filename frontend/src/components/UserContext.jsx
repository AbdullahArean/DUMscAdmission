import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  user: {
    accessToken: "",
    jwt: "",
    id: null,
    name: "",
    role: "",
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
