import Link from 'next/link';
import Image from 'next/image';
import { BsHouse, BsInfoCircle, BsGear, BsPower } from 'react-icons/bs';

export default function Sidebar() {
  return (
    <>
      <div className="logo font-extrabold">
        <Image className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" height="30px" width="32px" alt="Workflow" />
        <span>Next.js</span>
      </div>
      <div className="menu">
        <Link href="/">
          <a className="menu__link">
            <BsHouse />
            <p>Dashboard</p>
          </a>
        </Link>
        <Link href="/account">
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
        <Link href="/login">
          <a className="menu__link">
            <BsPower />
            <p>Logout</p>
          </a>
        </Link>
      </div>
    </>
  );
}
