import React from 'react';

const Header = () => {
  return (
    <div className=' flex flex-row items-center gap-2 bg-slate-900 py-4 px-12'>
      <div>
        <img src="/ereadus-logo.svg" alt="" className='size-16' />
      </div>
      <h1 className='important-text font-semibold'>EreadUS</h1>
    </div>
  );
}

export default Header;
