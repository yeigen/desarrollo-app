import { useState } from 'react'
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'
import { documentTextOutline, trashOutline } from 'ionicons/icons'
import SensorPage from '../components/SensorPage'
import { useFilesystem } from '../hooks/useFilesystem'

const NOTE_FILE = 'nota.json'

function FilesystemPage() {
  const [note, setNote] = useState('')
  const { files, content, error, writeJson, readFile, deleteFile } = useFilesystem()
  const cleanNote = note.trim()

  return (
    <SensorPage title="Archivos" error={error}>
      <p>Guarda una nota como JSON en la carpeta privada de la app.</p>
      <IonList>
        <IonItem>
          <IonInput
            label="Nota"
            labelPlacement="stacked"
            placeholder="Algo para recordar"
            value={note}
            onIonInput={e => setNote(e.detail.value ?? '')}
          />
        </IonItem>
      </IonList>
      <IonButton
        expand="block"
        disabled={!cleanNote}
        onClick={() => writeJson(NOTE_FILE, { nota: cleanNote, guardadaEn: new Date().toISOString() })}
      >
        Guardar {NOTE_FILE}
      </IonButton>
      <h2>Archivos guardados</h2>
      {files.length === 0 && <p>No hay archivos todavía.</p>}
      <IonList>
        {files.map(file => (
          <IonItem key={file.name}>
            <IonLabel>
              <h3>{file.name}</h3>
              <p>{file.size} bytes</p>
            </IonLabel>
            <IonButton slot="end" fill="clear" aria-label={`Leer ${file.name}`} onClick={() => readFile(file.name)}>
              <IonIcon slot="icon-only" icon={documentTextOutline} />
            </IonButton>
            <IonButton
              slot="end"
              fill="clear"
              color="danger"
              aria-label={`Eliminar ${file.name}`}
              onClick={() => deleteFile(file.name)}
            >
              <IonIcon slot="icon-only" icon={trashOutline} />
            </IonButton>
          </IonItem>
        ))}
      </IonList>
      {content && <pre>{content}</pre>}
    </SensorPage>
  )
}

export default FilesystemPage
