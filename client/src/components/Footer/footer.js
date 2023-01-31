import React from 'react';

const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();
    return (
        <footer className='bg-slate-900 font-hahmlet p-4 text-gray-400 flex justify-center text-xs'>
            <div>
                Copyright &copy; {CURRENT_YEAR} Haicore
            </div>
        </footer>
    );
};

export default Footer;