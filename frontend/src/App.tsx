import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { honoAPI } from './utils/api'
import { useQuery } from '@tanstack/react-query'

export default function App() {
  const { data, isPending, error } = useQuery({ queryKey: ["get-total-spent"], queryFn: fetchTotalExpenses })
  if (error) {
    return "Something went wrong..." + error.message
  }

  async function fetchTotalExpenses() {
    // const res = await fetch("api/expenses/total_expense")
    const res = await honoAPI.expenses.total_expense.$get()
    const data = await res.json()
    return data
  }


  return (
    <div className="h-screen w-full flex  justify-center p-16">
      <Card className='max-h-fit w-96'>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
          <CardDescription>Total amount :- </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isPending ? "..." : data?.total}</p>
        </CardContent>

      </Card>
    </div>
  )
}
