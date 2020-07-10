import { createTypedHooks } from 'easy-peasy';
import { IStoreModel } from 'src/interfaces';

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<IStoreModel>();

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export const useStore = typedHooks.useStore;
