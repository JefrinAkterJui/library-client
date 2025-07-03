import {useDispatch, useSelector} from 'react-redux'
import type { AppDispatch, RootSatate } from './store'

export const useAppSelector = useSelector.withTypes<RootSatate>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();