import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'


function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.theme);
    const { currentUser } = useSelector(state => state.user)
    return (
        <Navbar className='border-b-2'>
            c
            <form>
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color="gray" pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
                    onClick={() => {
                        console.log('Toggling theme'); // Debug
                        dispatch(toggleTheme());
                    }}
                >
                    <FaMoon />
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar
                            alt='user'
                            img={currentUser.profilePicture}
                            rounded />}>
                        <DropdownHeader>
                            <span className='block text-sm '>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate '>@{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>
                                profile
                            </DropdownItem>
                        </Link>

                        <DropdownDivider />
                        <DropdownItem>
                            Sing Out
                        </DropdownItem>
                    </Dropdown>
                ) : (
                    // ("")}
                    <Link to='/sign-in'> <Button className='bg-gradient-to-r from-purple-500 to-blue-500 
' outline>Sign in</Button>
                    </Link>
                )}
                <NavbarToggle />
            </div>



            <NavbarCollapse>
                <NavbarLink active={path === "/"} as={'div'}>
                    <Link to="/">Home</Link>
                </NavbarLink >

                <NavbarLink active={path === "/about"} as={'div'}>
                    <Link to="/about">About</Link>
                </NavbarLink>
                <NavbarLink active={path === "/projects"} as={'div'} >
                    <Link to="/projects">Project</Link>
                </NavbarLink>
            </NavbarCollapse>

        </Navbar >

    )
}

export default Header