import { configureStore } from '@reduxjs/toolkit'

import playerReducer from './features/playerSlice'
import { neteaseCoreApi } from './services/neteaseCore'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [neteaseCoreApi.reducerPath]: neteaseCoreApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(neteaseCoreApi.middleware),
})
