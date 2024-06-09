import Link from 'next/link';
import React from 'react';

function NavbarItem({ href, text, Icon }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Icon />
        <h4>{text}</h4>
      </div>
    </Link>
  );
}

export default NavbarItem;
