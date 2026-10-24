import { useParams } from 'react-router-dom'
import BudgetProvider from '../../context/BudgetProvider'
import Budget from '../Budget/Budget'

function SharedBudget() {
  const { ownerId } = useParams()

  return (
    <BudgetProvider key={ownerId} ownerId={ownerId!}>
      <Budget />
    </BudgetProvider>
  )
}

export default SharedBudget
