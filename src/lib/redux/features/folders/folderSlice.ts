import { FoldersItem } from '@/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface initialStateProps {
    folders: FoldersItem
}

const initialState: initialStateProps = {
    folders: []
}

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        folders: (state,action: PayloadAction<initialStateProps>) => {
            return {...action.payload}
        }
    },
})

export const { folders } = folderSlice.actions
export default folderSlice.reducer