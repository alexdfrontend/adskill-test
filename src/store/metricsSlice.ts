import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CurrentMetrics } from '../types/types';
import { mockData } from '../data/mockData';

interface MetricsState {
  data: CurrentMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  data: null,
  loading: false,
  error: null,
};

// Симуляция загрузки
export const loadMetrics = createAsyncThunk(
  'metrics/loadMetrics',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockData.currentMetrics as CurrentMetrics;
    } catch (error) {
      return rejectWithValue('Failed to load metrics');
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default metricsSlice.reducer;