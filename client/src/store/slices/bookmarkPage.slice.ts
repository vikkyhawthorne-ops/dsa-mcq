import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkPageState {
  filterQuery: string;
  selectedTag: string | null;
}

const initialState: BookmarkPageState = {
  filterQuery: '',
  selectedTag: null,
};

const bookmarkPageSlice = createSlice({
  name: 'bookmarkPage',
  initialState,
  reducers: {
    setBookmarkFilterQuery: (state, action: PayloadAction<string>) => {
      state.filterQuery = action.payload;
    },
    setBookmarkSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
  },
});

export const { setBookmarkFilterQuery, setBookmarkSelectedTag } = bookmarkPageSlice.actions;
export default bookmarkPageSlice.reducer;
