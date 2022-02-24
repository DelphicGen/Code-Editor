import { createSlice } from '@reduxjs/toolkit'
import { getFromLocalStorage } from '../../utils/storage'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: getFromLocalStorage('theme') || getFromLocalStorage('all-themes').data.light,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload
    }
  },
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer