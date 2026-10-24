import styles from './SectionLabel.module.scss'

interface SectionLabelProps {
  children: string
}

function SectionLabel({ children }: SectionLabelProps) {
  return <p className={styles.label}>{children}</p>
}

export default SectionLabel
