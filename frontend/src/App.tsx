import { useState } from 'react'
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  return (
    <div className="h-screen w-full flex  justify-center p-16">

      <Card className='max-h-fit w-96'>
        <CardHeader>
          <CardTitle>Expense Tracker</CardTitle>
          <CardDescription>Total amount :- </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>

      </Card>
    </div>
  )
}

export default App
