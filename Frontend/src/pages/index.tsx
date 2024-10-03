import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Hero from '@/components/HomePage/Hero';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import SharedHeaderLayout from '@/components/Layouts/SharedHeaderLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Findmyroomate',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// Load Poppins Font
const poppins = Montserrat({ subsets: ['latin'], weight: ['400'] });

export default function Home({ userData }: any) {
  return (
    <SharedHeaderLayout>
      <div className={`${poppins.className} relative h-lvh flex`}>
        <Image src='/bg.jpg' fill={true} alt='bg' className='hidden lg:flex z-[-2000] fixed opacity-10 overflow-visible' />
        <section className='flex flex-1 justify-center items-center mt-16 bg-[#edf2f4]'>
          <Hero />
        </section>
      </div>
    </SharedHeaderLayout>
  );
}
