// src/store/interview/interviewByIdGet.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchInterviewById = createAsyncThunk(
  'interview/fetchById',
  async (interviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(
        `https://api.onemeet.app/interview/business/${interviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
        }
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Xatolik yuz berdi')
    }
  }
)
