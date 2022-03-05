import Link from 'next/link';
import { BsHouse, BsInfoCircle, BsGear, BsPower } from 'react-icons/bs';

export default function Sidebar() {
  return (
    <>
      <div className="logo">Next.js</div>
      <div className="menu">
        <Link href="/">
          <a className="menu__link">
            <BsHouse />
            <p>Dashboard</p>
          </a>
        </Link>
        <Link href="/my">
          <a className="menu__link">
            <BsInfoCircle />
            <p>Profile</p>
          </a>
        </Link>
        <Link href="/settings">
          <a className="menu__link">
            <BsGear />
            <p>Settings</p>
          </a>
        </Link>
        <Link href="/logout">
          <a className="menu__link">
            <BsPower />
            <p>Logout</p>
          </a>
        </Link>
      </div>
    </>
  );
}
