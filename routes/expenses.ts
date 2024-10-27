import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";

interface Expensetype {
    id?: number,
    title: string,
    amount: number,
}


// dummy DB only
let dummyDB: Expensetype[] = [
    { "id": 1, "title": "Office Supplies", "amount": 150.00 },
    { "id": 2, "title": "Travel Expenses", "amount": 300.50 },
    { "id": 3, "title": "Software Subscription", "amount": 99.99 },
    { "id": 4, "title": "Client Lunch", "amount": 45.75 },
    { "id": 5, "title": "Internet Bill", "amount": 60.00 }
]

const ExpensesSchema = z.object({
    id: z.number().positive().int(),
    title: z.string().min(3).max(100),
    amount: z.number().positive().int(),

})

export const expensesRouteHandler = new Hono()
    // get all expenses
    .get("/", async (c) => {
        const getAllExpenses = dummyDB
        return c.json({ allExpenses: getAllExpenses })
    })
    // get a single expense
    .get("/:id{[0-9]+}", async (c) => {
        const incomingID = Number(c.req.param("id"))
        const getSingleExpense = dummyDB.find((exp) => exp.id === incomingID)
        if (!getSingleExpense) {
            return c.notFound()
        } else {
            return c.json({ getSingleExpense })
        }
    })
    // add a new expense without any id from user's side
    .post("/", zValidator("json", ExpensesSchema.omit({ id: true })), async (c) => {
        const newExpense = await c.req.valid("json");
        dummyDB.push(newExpense)
        console.log(newExpense)
        return c.json({ addedExpense: newExpense })
    })
    // delete an expense on the basis of ID
    .delete("/:id{[0-9]+}", async (c) => {
        const incomingID = Number(c.req.param("id"));
        console.log(incomingID)
        const checkExpenseExists = dummyDB.find((exp) => exp.id === incomingID)
        if (!checkExpenseExists) {
            return c.notFound()
        } else {
            const newArr = dummyDB.filter((exp) => exp.id !== incomingID);
            dummyDB = newArr
            return c.json({ updatedExpenses: dummyDB })
        }
    })