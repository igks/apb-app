import {
  GET_ANGGARAN,
  GET_ANGGARAN_HEADER,
  RECEIVE_ANGGARAN,
  RECEIVE_ANGGARAN_HEADER,
} from "redux/actions/anggaran-action";

const initialState = {
  list: {
    isFetching: false,
    data: [],
  },
  config: {
    isFetching: false,
    data: {
      id: null,
      income: 0,
      carryForward: 0,
      sum: 0,
      used: 0,
    },
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ANGGARAN:
      return {
        ...state,
        list: {
          isFetching: true,
        },
      };
    case RECEIVE_ANGGARAN:
      return {
        ...state,
        list: {
          isFetching: false,
          data: payload,
        },
      };
    case GET_ANGGARAN_HEADER:
      return {
        ...state,
        config: {
          isFetching: true,
        },
      };
    case RECEIVE_ANGGARAN_HEADER:
      return {
        ...state,
        config: {
          isFetching: false,
          data: payload,
        },
      };
    default:
      return state;
  }
};
