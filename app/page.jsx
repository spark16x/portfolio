import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <header className="w-full h-[50px] flex justify-between items-center bg-zinc-800">
      <Link href="#" className="p-[10px] text-red-600 text-lg" >Sprak</Link>
      <nav className="w-1/2 flex justify-around">
      <Link href="#" className="hover:text-red-600 hover:underline">Home</Link>
      <Link href="#" className="hover:text-red-600 hover:underline">About</Link>
      <Link href="#" className="hover:text-red-600 hover:underline">Skill</Link>
      <Link href="#" className="hover:text-red-600 hover:underline">Contact</Link>
      </nav>
    </header>
  </>);
}