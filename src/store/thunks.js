import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API = axios.create({
  baseURL: 'https://api.green-api.com'
})

export const authUserThunk = createAsyncThunk(
  'signIn/getAuthStatus',
  async (obj) => {
    try {
      const res = await API.get(`/waInstance${obj.idInstance}/GetSettings/${obj.apiTokenInstance}`)
      return true
    } catch (error) {
      console.log('Error: src/store/thunk/authUserThunk')
      return false
    }
  }
)

export const sendMessageThunk = createAsyncThunk(
  'send/sendMessage',
  async (obj) => {
    try {
      const res = await API.post(
        `/waInstance${obj.idInstance}/SendMessage/${obj.apiTokenInstance}`, 
        {
          "chatId": `${obj.chatId}@c.us`,
          "message": obj.message,
        })
      return obj.message
    } catch (error) {
      console.log('Error: src/store/thunk/sendMessageThunk')
    }
  }
)

export const getMessageThunk = createAsyncThunk(
  'recieve/getMessage',
  async (obj) => {
    try {
      const res = await API.get(`/waInstance${obj.idInstance}/ReceiveNotification/${obj.apiTokenInstance}`)
      const del = await API.delete(`https://api.green-api.com/waInstance${obj.idInstance}/DeleteNotification/${obj.apiTokenInstance}/${res.data.receiptId}`)
      return {
        message: res.data.body.messageData.textMessageData.textMessage,
        timestamp: res.data.body.timestamp,
        number: res.data.body.senderData.sender.replace('@c.us', '')
      } 
    } catch (error) {
      console.log('Error. No messages to appear: src/store/thunk/getMessageThunk')
      return 'failure'
    }
  }
)