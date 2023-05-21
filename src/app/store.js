import { configureStore } from '@reduxjs/toolkit'
import chatSlice from '../store/chat'

export const store = configureStore({
  reducer: {
    chat: chatSlice
  },
})
