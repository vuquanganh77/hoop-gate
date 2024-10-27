import Link from 'next/link';
import { LoginButton } from '@/components/auth/login-button';
import { PrismaClient } from '@prisma/client';
import {Button} from '@/components/ui/button'

const prisma = new PrismaClient();
export default async function Home() {

  
  return (
    <>
      <div>This is home page</div>
      
      <LoginButton>
        <Button className="bg-sky-500">Click me</Button>
      </LoginButton>


      
    </>

  );
}
