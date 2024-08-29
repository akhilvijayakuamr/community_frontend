import React, {useState} from 'react'

export const UserHeader: React.FC =()=> {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toogleMenu = () =>{
        setIsMenuOpen(!isMenuOpen)
    };


    return (
        <header className='bg-teal-800 p-4 shadow-md flex items-center justify-between'>
            <div className='text-lg font-bold'>AssureTech</div>
            <nav className='flex items-center'>
                <ul className='hidden lg:flex space-x-4'>
                    <li>
                        <a href='#' className='text-white hover:text-gray-200'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white hover:text-gray-200'>
                            Users
                        </a>
                    </li>
                </ul>

                {/* Mobile view */}

                <button
                className='lg:hidden text-gray_700'
                >☰</button>
            </nav>

            {isMenuOpen &&(
                <div className='lg:hidden fixed inset-0 z-30 bg-gray-800 text-white flex flex-col items-center pt-16'>
                    <ul className='space-y-4'>
                        <li>
                            <a href='#' className='block px-4 py-2 hover:bg-gray-700' onClick={toogleMenu}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href='#' className='block px-4 py-2 hover:bg-gray-700' onClick={toogleMenu}>
                                Userlist
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )

}
