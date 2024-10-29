import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { honoAPI } from '@/utils/api'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
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
    <Card className='max-h-fit w-96'>
      <CardHeader>
        <CardTitle>Expense Tracker</CardTitle>
        <CardDescription>Total amount :- </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{isPending ? "..." : data?.total}</p>
      </CardContent>

    </Card>
  )
}
