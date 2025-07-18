import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

export default function DashSidebar() {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab')
        // console.log(tabFormUrl)
        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])
    return (
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup>
                    <Link to='dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>
                            profile
                        </SidebarItem>
                    </Link>

                    <SidebarItem icon={HiArrowSmRight} className='cursor-pointer'>
                        sign out
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}
