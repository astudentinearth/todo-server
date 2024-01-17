import {createSlice} from '@reduxjs/toolkit'
import { AppState } from './store'
import { Todo } from '@/lib/types'

export interface TodoState{
    todos: Todo[]
}

const initialState: TodoState = {
    todos: []
}