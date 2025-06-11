
import {
    Footer,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function FooterCom() {
    return (
        <Footer color="white" className=" p-3 border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white' >
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>sagar's</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 ">
                        <div>
                            <FooterTitle title="about" >
                            </FooterTitle>
                            <FooterLinkGroup col >
                                <FooterLink href="#" target="_blank" role="noopen noreferrer" >
                                    project
                                </FooterLink>
                                <FooterLink href="/about" target="_blank" role="noopen noreferrer" >
                                    blog
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="follow us" >
                            </FooterTitle>
                            <FooterLinkGroup col >
                                <FooterLink href="#" target="_blank" role="noopen noreferrer" >
                                    github
                                </FooterLink>
                                <FooterLink href="#" target="_blank" role="noopen noreferrer" >
                                    Discord
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="legal" >
                            </FooterTitle>
                            <FooterLinkGroup col >
                                <FooterLink href="#">
                                    privary policy
                                </FooterLink>
                                <FooterLink href="/about" target="_blank" role="noopen noreferrer" >
                                    Term &amp; Conditions
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="Sagar's blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                        <FooterIcon href="#" icon={BsGithub} />
                        <FooterIcon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer >
    )
}