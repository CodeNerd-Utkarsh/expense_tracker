import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { honoAPI } from '@/utils/api'
import { useToast } from "@/hooks/use-toast"

export const Route = createFileRoute('/createNewExpense')({
  component: CreateNewExpense
})

export default function CreateNewExpense() {
  const { toast } = useToast()

  // const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const res = await honoAPI.expenses.$post({ json: value })
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error: Something went wrong...",
        })
      } else {
        toast({
          variant: "default",
          title: "OK: Added a new expense"
        })
        // navigate({ to: "/allExpenses" })
        form.reset()
      }
    },
  })
  return (
    <form className='w-96 flex flex-col item-center gap-8'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <form.Field
          name="title"
          children={(field) => (
            <>
              <Label htmlFor="inputTitle">Title</Label>
              <Input
                id='inputTitle'
                placeholder='Title'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </>
          )}
        />
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <Label htmlFor="inputAmount">Email</Label>
              <Input
                id='inputAmount'
                placeholder='Amount'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type='number'
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.errors ? (
                <em role="alert">{field.state.meta.errors.join(', ')}</em>
              ) : null}
            </>
          )}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}