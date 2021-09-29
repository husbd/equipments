import { createAction, props } from '@ngrx/store';
import { Equipment } from 'src/app/models/equipment.model';

export const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';
export const UPDATE_UPDATED_EQUIPMENT = 'UPDATE_UPDATED_EQUIPMENT';
export const SET_IS_CREATE = 'SET_IS_CREATE';
export const SET_IS_FORM_VALID = 'SET_IS_FORM_VALID';

export const updateEquipment = createAction(
    UPDATE_EQUIPMENT,
    props<{ equipment: Equipment }>()
);

export const updateUpdatedEquipment = createAction(
    UPDATE_UPDATED_EQUIPMENT,
    props<{ equipment: Equipment }>()
);

export const setIsCreate = createAction(
    SET_IS_CREATE,
    props<{ isCreate: boolean }>()
);

export const setIsFormValid = createAction(
    SET_IS_FORM_VALID,
    props<{ isFormValid: boolean }>()
);