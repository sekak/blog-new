'use client'
import {
  Navbar as Nav, NavbarBrand, NavbarContent,
  NavbarItem, NavbarMenu, NavbarMenuItem,
  NavbarMenuToggle, DropdownMenu, DropdownTrigger,
  Dropdown, Avatar, DropdownItem,
} from "@heroui/react";
import { BookOpen, Heart, Home, LogOut, SquarePlus, UserPen } from "lucide-react";
import ModeToggle from "@/components/ui/mode-toggle";
import useSWR from "swr";
import { fetcher } from "@/utils/utils";
import Link from "next/link";
import { useLogOut } from "@/components/navbar/hooks/useLogOut";

const menuItems = [
  "Home",
  "Write",
  "Contact"
];

export default function Navbar() {
  const { data, isLoading } = useSWR(`/api/users`, fetcher);
  const { logout } = useLogOut();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload()
      console.log("Logged out successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Logout failed:", err.message);
      } else {
        console.error("Logout failed:", err);
      }
    }
  };

  const getPath = (name: string) => {
    return `/${name.toLocaleLowerCase().replace(/[^a-z0-9]/g, '')}`;
  }

  return (
    <Nav isBlurred className="gap-6" maxWidth={'xl'} isBordered shouldHideOnScroll>
      <NavbarBrand className="flex items-center">
        {data && <NavbarMenuToggle className="sm:hidden p-2 mr-3" />}
        <Link href="/" color="foreground" className="flex items-center">
          <BookOpen className="mr-2" />
          <p className="font-medium hidden sm:flex">Med_Blog</p>
        </Link>
      </NavbarBrand>
      {data && !isLoading &&
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/" className="flex items-center gap-1">
              <Home className="w-5 h-5"/>
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link aria-current="page" href="/write" className="flex items-center gap-1">
              <SquarePlus className="w-5 h-5"/> 
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/contact" className="flex items-center gap-1">
              <UserPen className="w-5 h-5"/>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href={getPath(data?.name)} className="flex items-center gap-1">
              <Heart className="w-5 h-5"/> 
            </Link>
          </NavbarItem>
        </NavbarContent>}
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
                <DropdownItem key="mode" className="py-3">
                  <div className="flex items-center">
                    <ModeToggle/>
                  </div>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
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
