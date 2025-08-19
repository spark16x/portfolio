import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <header className="w-full h-md flex ">
      <Link href="#">Sprak</Link>
      <nav>
      <Link href="#">Home</Link>
      <Link href="#">About</Link>
      <Link href="#">Skill</Link>
      <Link href="#">Contact</Link>
      </nav>
    </header>
  </>);
}