'use client';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Giup dam bao type  cua state trong store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
