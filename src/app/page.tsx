import SignIn from '@/app/(auth)/sign-in/page'; 

export default function Home() {
  return (
    <div className='container mx-auto max-w-sm px-4 py-5 shadow-md mt-10 mb-9 bg-orange-200 p-10 rounded-md'>
      <SignIn />
    </div>
  );
}
