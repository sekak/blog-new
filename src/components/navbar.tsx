'use client'
import { logout } from "@/app/api/auth/action";
import {
  Navbar as Nav, NavbarBrand, NavbarContent,
  NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem,
  NavbarMenuToggle, DropdownMenu, DropdownTrigger,
  Dropdown, Avatar, DropdownItem,
  Skeleton
} from "@heroui/react";
import { BookOpen, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import ModeToggle from "./mode-toggle";
import { getCurrentUser, getUser } from "@/app/requests/hooks/getUsers";


const menuItems = [
  "Home",
  "Write",
  "Contact"
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const user = await getCurrentUser()
      setUser(user)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleClickLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <Nav isBlurred className="gap-6" maxWidth={'xl'}>
      <NavbarBrand className="flex items-center">
        <NavbarMenuToggle className="sm:hidden p-2 mr-3" />
        <Link href="/" color="foreground" size="lg">
          <BookOpen className="mr-2 hidden sm:flex" />
          Med Blog
        </Link>
      </NavbarBrand>
      {user && !loading ?
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link aria-current="page" href="/write">
              Write
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/contact">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
        :
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Skeleton className="w-16 h-6 rounded-lg" />
          </NavbarItem>
          <NavbarItem >
            <Skeleton className="w-16 h-6 rounded-lg" />
          </NavbarItem>
          <NavbarItem>
            <Skeleton className="w-16 h-6 rounded-lg" />
          </NavbarItem>
        </NavbarContent>
      }
      <NavbarContent justify="end">
        {!user && !loading ?
          <div className="flex gap-4 items-center">
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
            <ModeToggle isLogged={false} />
          </div>
          :
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  size="sm"
                  src={user?.user_metadata.avatar_url
                    ? user?.user_metadata.avatar_url
                    : `https://avatar.vercel.sh/${user?.email}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-light">{user?.email}</p>
                </DropdownItem>
                <DropdownItem key='mode'>
                  <div className="flex items-center">
                    <ModeToggle isLogged={true} />
                  </div>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleClickLogout}>
                  <div className="flex items-center">
                    <LogOut className="text-foreground h-5 w-5 m-2" />
                    <p>Logout</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        }
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={`/${item.toLocaleLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nav>
  );
}
