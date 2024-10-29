import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <div className="h-screen w-full flex  justify-center p-16 border border-yellow-600">
        <Outlet />
      </div>
    </>
  )
  //  <TanStackRouterDevtools /> 

})

function Navbar() {
  return <div className="p-2 flex gap-2">
    <Link to="/" className="[&.active]:font-bold">
      Home
    </Link>{' '}
    <Link to="/about" className="[&.active]:font-bold">
      About
    </Link>
    <Link to="/allExpenses" className="[&.active]:font-bold">
      Expenses
    </Link>
    <Link to="/createNewExpense" className="[&.active]:font-bold">
      Create New
    </Link>
  </div>
}