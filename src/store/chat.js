import { createSlice } from '@reduxjs/toolkit'
import { authUserThunk, sendMessageThunk, getMessageThunk } from './thunks'

const initialState = {
  isActiveDialog: '',
  chats: [],
  messages: [],
  isLoggedIn: false,
  isNumberValid: true,
  authData: {
    idInstance: '1101823033',
    apiTokenInstance: '4a5cc2cf6c35473ba2067ebb3e122c5ad75630a39b944576b5'
  }
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getAuthInput: (state, action) => {
      return {
        ...state,
        authData: {
          ...state.authData,
          idInstance: action.payload.idInstance,
          apiTokenInstance: action.payload.apiTokenInstance
        }
      }
    },
    createNewChat: (state, action) => {
      if (action.payload.length !== 11 || action.payload.charAt(0) !== '7') {
        return {
          ...state,
          isNumberValid: false
        }
      }
      return {
        ...state,
        chats: [...state.chats, action.payload],
        messages: [...state.messages, {
          dialog: action.payload,
          chatHistory: []
        }],
        isNumberValid: true
      }
    },
    setActiveDialog: (state, action) => {
      state.isActiveDialog = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authUserThunk.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages.map(e => {
        if (e.dialog === state.isActiveDialog) {
          e.chatHistory.push({
            sender: 'me', 
            text: action.payload
        })
        }
      })
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      if (action.payload === 'failure') return
      if (state.messages.length === 0) {
        return {
          ...state,
          chats: [...state.chats, action.payload.number],
          messages: [...state.messages, {
          dialog: action.payload.number,
          chatHistory: [{
            sender: 'friend', 
            text: action.payload.message, 
            timestamp: action.payload.timestamp
          }]
        }],
        isNumberValid: true
        }
      }
      state.messages.map(e => {
        if (e.dialog === state.isActiveDialog) {
          // prevents a messages with the same timestamp to render multiple times
          const duplicate = e.chatHistory.find(i => i.timestamp === action.payload.timestamp)
          if (!!duplicate) return
          e.chatHistory.push({
            sender: 'friend', 
            text: action.payload.message, 
            timestamp: action.payload.timestamp
          })
        }
      })
    })
  },
})

export const { getAuthInput, createNewChat, setActiveDialog } = chatSlice.actions

export default chatSlice.reducer