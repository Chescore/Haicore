import React from 'react';

const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();
    return (
        <footer className='bg-color-fit-2 p-4 text-gray-300 flex justify-center text-xs'>
            <div>
                Copyright &copy; {CURRENT_YEAR} Haicore
            </div>
        </footer>
    );
};

export default Footer;