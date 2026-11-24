import { WorkspacesList } from "@/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface initialStateProps {
  workspaces: WorkspacesList
}

const initialState: initialStateProps = {
  workspaces: []
}

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    reducers: {
      workspaces: (state, action: PayloadAction<initialStateProps>) =>{
        return {...action.payload}
      }
    }
})

export const { workspaces } = workspaceSlice.actions
export default workspaceSlice.reducer