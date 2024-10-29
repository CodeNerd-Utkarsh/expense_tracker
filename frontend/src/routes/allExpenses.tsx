import { honoAPI } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton'


export const Route = createFileRoute('/allExpenses')({
  component: AllExpenses
})

export default function AllExpenses() {
  const { data, isPending, error } = useQuery({ queryKey: ["get-all-expenses"], queryFn: getAllExpenses })
  if (error) {
    return "Something went wrong..." + error.message
  }
  async function getAllExpenses() {
    const res = await honoAPI.expenses.$get()
    const data = await res.json()
    return data
  }

  return (
    <div className='max-w-2xl '>
      <Table>
        <TableCaption>A list of your Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=""> ID</TableHead>
            <TableHead>Expense Title</TableHead>
            <TableHead>Expense Amount</TableHead>
          </TableRow>
        </TableHeader>
        {
          isPending ? (<TableSkeleton />) : (
            <TableBody>
              {data?.allExpenses.map((exp) => (
                <TableRow key={exp?.id}>
                  <TableCell className="font-medium">{exp?.id}</TableCell>
                  <TableCell>{exp?.title}</TableCell>
                  <TableCell>{exp?.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )
        }
      </Table>
    </div>
  )
}

function TableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell className="font-medium">
            <Skeleton className="min-w-40 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="min-w-40 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="min-w-40 h-8" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

}