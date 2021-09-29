import { createReducer, on } from "@ngrx/store";
import { Equipment } from "src/app/models/equipment.model";
import { setIsCreate, setIsFormValid, updateEquipment, updateUpdatedEquipment } from "./equipment-form.actions";

// app state
export interface State {
    equipment?: Equipment;
    updatedEquipment?: Equipment;
    isCreate?: boolean;
    isFormValid?: boolean;
};

const initialState: State = {
    isFormValid: false
};

export const editEquipmentReducer = createReducer(
    initialState,
    on(updateEquipment, (state, { equipment }) => {
        return {
            ...state,
            equipment: {...equipment}
        };
    }),
    on(updateUpdatedEquipment, (state, { equipment }) => {
        return {
            ...state,
            updatedEquipment: {...equipment}
        };
    }),
    on(setIsCreate, (state, { isCreate }) => {
        return {
            ...state,
            isCreate: isCreate,
            equipment: isCreate ? undefined : state.equipment,
            updatedEquipment: isCreate ? undefined : state.updatedEquipment,
        };
    }),
    on(setIsFormValid, (state, { isFormValid }) => {
        return {
            ...state,
            isFormValid: isFormValid
        };
    }),
);