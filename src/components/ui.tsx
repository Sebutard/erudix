import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="topbar">
        <Link to="/home" className="brand">
          ERUDIX
        </Link>
        <nav className="topnav" aria-label="Navigation principale">
          <Link to="/history">Historique</Link>
          <Link to="/profile">Profil</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export function Button({
  children,
  onClick,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}

export function Chip({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`chip ${selected ? 'selected' : ''}`} onClick={onClick} type="button">
      {selected ? '✓ ' : ''}
      {children}
    </button>
  );
}
