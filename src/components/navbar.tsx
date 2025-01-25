'use client'
import { logout } from "@/app/api/auth/action";
import { createClient } from "@/utils/supabase/client";
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, DropdownMenu, DropdownTrigger, Dropdown, Avatar, DropdownItem } from "@heroui/react";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import ModeToggle from "./mode-toggle";


const menuItems = [
  "Home",
  "Write",
  "Contact"
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session?.user)
      }
      if (!session) {
        setUser(null)
      }
    })
  }, [])

  const handleClickLogout = async () => {
    await logout()
    window.location.reload()
  }
  
  return (
    <Nav isBlurred className="gap-6" maxWidth={'xl'}>
      <NavbarBrand className="flex items-center">
        <NavbarMenuToggle className="sm:hidden p-2 mr-3"/>
        <Link href="/" color="foreground" size="lg">
          <BookOpen className="mr-2"/>
          Med Blog
        </Link>
      </NavbarBrand>
      {user && <NavbarContent className="hidden sm:flex gap-10" justify="center">
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
      </NavbarContent>}
      <NavbarContent justify="end">
        {!user ?
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </> 
          :
          <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user.
                user_metadata
                 ? user.
                 user_metadata.picture
                  :"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleClickLogout}>
              Log Out
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
        <ModeToggle/>
    </Nav>
  );
}
