'use client'
import {
  Navbar as Nav, NavbarBrand, NavbarContent,
  NavbarItem, NavbarMenu, NavbarMenuItem,
  NavbarMenuToggle, DropdownMenu, DropdownTrigger,
  Dropdown, Avatar, DropdownItem,
} from "@heroui/react";
import { BookOpen, LogOut } from "lucide-react";
import ModeToggle from "./mode-toggle";
import useSWR from "swr";
import { fetcher } from "@/utils/utils";
import Link from "next/link";


const menuItems = [
  "Home",
  "Write",
  "Contact"
];

export default function Navbar() {

  const handleClickLogout = async () => {
    // await logout()
    // window.location.reload()
  }

  const { data, isLoading } = useSWR(`/api/users`, fetcher);

  return (
    <Nav isBlurred className="gap-6" maxWidth={'xl'} isBordered>
      <NavbarBrand className="flex items-center">
        <NavbarMenuToggle className="sm:hidden p-2 mr-3" />
        <Link href="/" color="foreground" className="flex items-center">
          <BookOpen className="mr-2 hidden sm:flex" />
          Med Blog
        </Link>
      </NavbarBrand>
      {data && !isLoading &&
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
        </NavbarContent> }
      <NavbarContent justify="end">
        {data &&
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  size="sm"
                  src={data?.avatar_url
                    ? data?.avatar_url
                    : `https://avatar.vercel.sh/${data?.email}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-light">{data?.email}</p>
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
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nav>
  );
}
