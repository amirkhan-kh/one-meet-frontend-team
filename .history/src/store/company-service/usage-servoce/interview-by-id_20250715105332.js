import { createSlice } from '@reduxjs/toolkit'
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
// src/store/interview/interviewSlice.js

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInterviewById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInterviewById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchInterviewById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default interviewSlice.reducer
