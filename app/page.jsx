import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <header className="w-full h-md flex justify-between">
      <Link href="#">Sprak</Link>
      <nav className="h-full flex justify-between">
      <Link href="#" className="">Home</Link>
      <Link href="#" className="">About</Link>
      <Link href="#" className="">Skill</Link>
      <Link href="#" className="">Contact</Link>
      </nav>
    </header>
  </>);
}