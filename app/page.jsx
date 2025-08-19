import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <header className="w-full h-[50px] flex justify-between items-center bg-zinc-800">
      <Link href="#" className="text-red-600 w-sm" >Sprak</Link>
      <nav className="w-1/2 flex justify-around">
      <Link href="#" className="">Home</Link>
      <Link href="#" className="">About</Link>
      <Link href="#" className="">Skill</Link>
      <Link href="#" className="">Contact</Link>
      </nav>
    </header>
  </>);
}