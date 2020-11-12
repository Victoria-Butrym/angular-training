import * as customerActions from './customer.actions';
import { Customer } from '../models/customer.model';
import * as fromRoot from '../../state/app.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null,
  loading: boolean,
  loaded: boolean,
  error: string,
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState,
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: '',
}

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(state = initialState, action: customerActions.Actions): CustomerState {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false
      })
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        entities: {},
        error: action.payload
      }
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      })
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state)
    }
    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload, state)
    }
    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state)
    }
    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export const getCustomersFeatureState = createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(
  getCustomersFeatureState,
  customerAdapter.getSelectors().selectAll,
);

export const getCustomersLoading = createSelector(
  getCustomersFeatureState,
  (state) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomersFeatureState,
  (state) => state.loaded
);

export const getError = createSelector(
  getCustomersFeatureState,
  (state) => state.error
);

export const getCurrentCustomerId = createSelector(
  getCustomersFeatureState,
  (state) => state.selectedCustomerId
)

export const getCurrentCustomer = createSelector(
  getCustomersFeatureState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId]
)
