'use client';
import Link from 'next/link';
import SignInForm from '@/features/auth/signin-form';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Content1 from '@/features/auth/carousel-content/content1';
import Content2 from '@/features/auth/carousel-content/content2';
import Content3 from '@/features/auth/carousel-content/content3';
export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className=" col-span-3 h-[100vh] rounded-md p-6">
        <Carousel
          className="h-full"
          plugins={[
            Autoplay({
              delay: 2000
            })
          ]}
        >
          <CarouselContent className="h-full">
            <CarouselItem className="h-[680px]">
              <Content1 />
            </CarouselItem>
            <CarouselItem>
              <Content2 />
            </CarouselItem>
            <CarouselItem>
              <Content3 />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="col-span-2 flex h-full items-center border p-4 lg:p-8">
        <div className=" mx-auto flex  w-[420px] flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 border-b pb-2 text-left">
            <h1 className="text-left text-2xl font-semibold tracking-tight">
              Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Masukkan email Anda di bawah ini untuk masuk akun Anda
            </p>
          </div>
          <SignInForm />
          <p className=" text-center text-sm text-muted-foreground">
            Dengan mengklik lanjutkan Anda setuju dengan kami{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Ketentuan Layanan
            </Link>{' '}
            dan{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
