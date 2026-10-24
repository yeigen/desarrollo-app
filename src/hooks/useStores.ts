import { useContext } from 'react'
import { StoresContext } from '../context/StoresContext'

export function useStores() {
  return useContext(StoresContext)!
}
