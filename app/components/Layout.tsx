import Link from "next/link"
import type { ReactNode } from "react"
import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { useRouter } from "next/navigation"

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      <nav className="w-64 bg-white shadow-md">
        <ul className="p-4 space-y-2">
          <li>
            <Link href="/" className="block p-2 hover:bg-gray-200 rounded">
              דף הבית
            </Link>
          </li>
          <li>
            <Link href="/employees" className="block p-2 hover:bg-gray-200 rounded">
              עובדים
            </Link>
          </li>
          <li>
            <Link href="/meetings" className="block p-2 hover:bg-gray-200 rounded">
              פגישות
            </Link>
          </li>
          <li>
            <Link href="/constraints" className="block p-2 hover:bg-gray-200 rounded">
              אילוצים
            </Link>
          </li>
          {user ? (
            <li>
              <button onClick={handleSignOut} className="block w-full text-right p-2 hover:bg-gray-200 rounded">
                התנתק
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login" className="block p-2 hover:bg-gray-200 rounded">
                  התחבר
                </Link>
              </li>
              <li>
                <Link href="/register" className="block p-2 hover:bg-gray-200 rounded">
                  הרשם
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}

