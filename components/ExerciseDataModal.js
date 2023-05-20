import React from 'react'
import ModalWrapper from './ModalWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { hideExerciseDataModal } from '../redux/exerciseDataSlice'

function ExerciseDataModal() {
    const { show, exerciseMinimalData } = useSelector(store => store.exerciseDataModalReducer)

    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(hideExerciseDataModal())
    }

    // api call using exerciseMinimalData
    // C.R.U.D operations will take place
    // 4 apis to integrate


    return (
        show &&
        <ModalWrapper closeModal={closeModal}></ModalWrapper>
    )
}

export default ExerciseDataModal