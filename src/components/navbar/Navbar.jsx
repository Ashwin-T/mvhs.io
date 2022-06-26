import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import {AiFillHome} from 'react-icons/ai';
import {ImWrench} from 'react-icons/im';
import {HiLink} from 'react-icons/hi'
import {useState, useEffect} from 'react';
import "./navbar.css";


const Navbar = () => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        
        window.addEventListener("orientationchange", function(event) {
            setWidth(window.innerWidth);
        });

        window.addEventListener('resize', function(event){
            setWidth(window.innerWidth)
        });

        return () => {
            window.removeEventListener("orientationchange", function(event) {
                setWidth(window.innerWidth);
            });
            window.removeEventListener('resize', function(event){
                setWidth(window.innerWidth)
            });
        }

    }, [window.innerWidth, window.innerHeight, window.orientation]);

    const content = [
        {
            name: "Map",
            icon: <SiGooglemaps size={35} />,
            link: "/map",
        },
        {
            name: "Resources",
            icon: <HiLink size={35} />,
            link: "/resources",
        },
        {
            name: "Utilities",
            icon: <ImWrench size={35} />,
            link: "/utilities",
        },
        {
            name: "Settings",
            icon: <MdSettings size={35} />,
            link: "/settings",
        }
    ];

    const mobileContent = [
        {
            name: "Map",
            icon: <SiGooglemaps size={35} />,
            link: "/map",
        },
        {
            name: "Resources",
            icon: <HiLink size={35} />,
            link: "/resources",
        },
        {
            name: "Home",
            icon: <AiFillHome size={35} />,
            link: "/",
        },
        {
            name: "Utilities",
            icon: <ImWrench size={35} />,
            link: "/utilities",
        },
        {
            name: "Settings",
            icon: <MdSettings size={35} />,
            link: "/settings",
        }
    ];
    
    const DesktopNavBar = () => {
        return (
            <div className='nav-wrapper'>
                <nav className='default'>
                    <Link to='/' className='home-link'>
                        <img alt='logo' src='images/logoNav.png' />
                    </Link>
                    <div className='icon-wrapper'>
                        {content.map((item, index) => {
                            return (    
                                <Link key={index} className={window.location.pathname === item.link ? 'active' : 'link'} to={item.link}>
                                    {item.icon}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        );
    }

    const MobileNavBar = () => {
        return (
            <div className='nav-wrapper'>
                <footer className='mobile-nav'>
                    <div className='icon-wrapper'>
                        {
                            mobileContent.map((item, index) => {
                                return (    
                                    <Link key={index} className={window.location.pathname === item.link ? 'active' : 'link'} to={item.link}>
                                        {item.icon}
                                    </Link>
                                );
                            })
                        }
                    </div>
                </footer>
            </div>
        )
    }

    return (
        <>
            {width > 768 ? <DesktopNavBar /> : <MobileNavBar />}
        </>
    )
   
};

export default Navbar;
