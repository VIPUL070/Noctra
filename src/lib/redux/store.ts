import { configureStore } from '@reduxjs/toolkit'
import FolderReducer from './features/folders/folderSlice'
import WorkspaceReducer from './features/workspaces/workspaceSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        folder: FolderReducer,
        workspace: WorkspaceReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']