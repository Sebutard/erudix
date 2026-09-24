import { Link } from 'react-router-dom';
export function Shell({children}:{children:React.ReactNode}){return <><header className="topbar"><Link to="/home" className="brand">ERUDIX</Link><nav><Link to="/history">Historique</Link><Link to="/profile">Profil</Link></nav></header><main>{children}</main></>}
export function Button({children,onClick,type='button'}:{children:React.ReactNode;onClick?:()=>void;type?:'button'|'submit'}){return <button className="button" type={type} onClick={onClick}>{children} <span>→</span></button>}
export function Chip({children,selected,onClick}:{children:React.ReactNode;selected:boolean;onClick:()=>void}){return <button className={`chip ${selected?'selected':''}`} onClick={onClick}>{selected?'✓ ':''}{children}</button>}
