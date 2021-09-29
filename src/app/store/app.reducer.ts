import { ActionReducerMap } from '@ngrx/store';
import * as fromEditEquipment from '../shared/forms/equipment-form/store/equipment-form.reducer';

export interface AppState {
    editEquipment: fromEditEquipment.State
}

export const appReducer: ActionReducerMap<AppState> = {
    editEquipment: fromEditEquipment.editEquipmentReducer
};