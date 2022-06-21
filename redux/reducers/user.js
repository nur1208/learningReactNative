import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
} from "../constants";

const initialState = {
  currentUser: null,
  posts: [],
};

export const user = (state = initialState, actions) => {
  console.log(actions);

  console.log({ actoin: actions.type });
  switch (actions.type) {
    case USER_STATE_CHANGE:
      console.log("hereerer");

      return { ...state, currentUser: actions.currentUser };

    case USER_POST_STATE_CHANGE:
      return { ...state, posts: actions.posts };

    default:
      return { ...state };
  }
};
