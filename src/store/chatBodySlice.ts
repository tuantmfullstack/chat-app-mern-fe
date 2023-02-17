import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { ChatBodyStateI } from './type';
import instance from '../utils/axiosConfig';
import handleThunk from '../utils/HandleThunk';

interface DataI {
  conversationId: string;
  skip: number;
}

const initialState: ChatBodyStateI = {
  isLoading: false,
  isContinue: true,
  messages: [],
  err: false,
};

export const getMessagesThunk = createAsyncThunk(
  'getMessagesThunk',
  ({ conversationId, skip }: DataI, { rejectWithValue }) => {
    const fn = instance.get(`messages/${conversationId}?skip=${skip}&limit=10`);
    return handleThunk(fn, rejectWithValue);
  }
);

export const deleteMessageThunk = createAsyncThunk(
  'deleteMessageThunk',
  (_id: string, { rejectWithValue }) => {
    const fn = instance.delete(`messages/${_id}`);
    return handleThunk(fn, rejectWithValue);
  }
);

export const emotionMessageThunk = createAsyncThunk(
  'emotionMessageThunk',
  ({ _id, type }: { _id: string; type: string }, { rejectWithValue }) => {
    const fn = instance.post(`messages/${_id}`, { type });
    return handleThunk(fn, rejectWithValue);
  }
);

const chatBodySlice = createSlice({
  name: 'chatBodySlice',
  initialState,
  reducers: {
    addingMessage: (state, { payload }) => {
      state.messages[0].data = [payload, ...state.messages[0].data];
    },
    resetMessages: (state) => {
      state.isLoading = false;
      state.messages = [];
      state.isContinue = true;
      state.err = false;
    },
    addingEmotion: (state, { payload }) => {
      const { id, _id, type } = payload;

      const message = state.messages.find((message) => message.id === id);
      const msg = message?.data.find((msg) => msg._id === _id)!;

      if (!msg?.emotions.includes(type)) {
        msg.emotions.push(type);
      }
    },
  },
  extraReducers: {
    [getMessagesThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [getMessagesThunk.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isContinue = payload.isContinue;
      state.err = false;
      state.messages.push({ id: Math.random(), data: payload.messages });
    },
    [getMessagesThunk.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isContinue = false;
      state.err = true;
    },
    [deleteMessageThunk.pending.type]: (state, { payload }) => {
      state.isLoading = true;
      state.err = false;
    },
    [deleteMessageThunk.fulfilled.type]: (state, { payload }) => {
      // console.log({ payload });

      state.messages = state.messages.map((messageWrapper) => ({
        id: messageWrapper.id,
        data: messageWrapper.data.filter(
          (message) => message._id !== payload._id
        ),
      }));
    },
    [deleteMessageThunk.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isContinue = false;
      state.err = true;
    },
  },
});

export default chatBodySlice;
