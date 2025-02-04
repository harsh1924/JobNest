import { Link } from "react-router-dom"
import { Button } from "./ui/button"

function Header() {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={'/'}>
          JN
        </Link>
        <Button variant="outline">
          Login
        </Button>
      </nav>
    </>
  )
}

export default Header