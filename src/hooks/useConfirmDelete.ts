import { useIonAlert } from '@ionic/react'

export function useConfirmDelete() {
  const [presentAlert] = useIonAlert()

  return (name: string, confirmLabel: string, onConfirm: () => void) => presentAlert({
    header: `Eliminar "${name}"`,
    buttons: [
      { text: 'Volver', role: 'cancel' },
      { text: confirmLabel, role: 'destructive', handler: onConfirm },
    ],
  })
}
