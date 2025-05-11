import Navbar from '@/components/shared/navbar';
import React from 'react';
import OtherArticle from './other-article';

const DetailArticle = () => {
  return (
    <div>
      <Navbar />
      <div className="space-y-10 px-5 pt-[100px] sm:px-10 md:pt-[150px] lg:px-[160px]">
        {/*  */}
        <div className="space-y-4 sm:space-y-6 md:space-y-10">
          <div>
            <div className=" mx-auto max-w-[642px] space-y-4 text-center">
              <p className="text-sm text-slate-600">
                February 4, 2025 Created by Admin
              </p>
              <h3 className="text-2xl font-semibold md:text-3xl">
                Figma's New Dev Mode: A Game-Changer for Designers & Developers
              </h3>
            </div>
          </div>
          <img src="/content1.jpg" alt="" />
          <p className="pb-7 text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            nihil, nisi animi, atque ipsam alias quae quia provident cupiditate
            perferendis repellendus sed vero sapiente consequatur impedit.
            Perferendis magnam dignissimos adipisci dolores? Aspernatur soluta
            repellat hic pariatur obcaecati recusandae nesciunt veniam vero,
            assumenda omnis harum atque, impedit est, amet fuga? Debitis
            reiciendis temporibus fuga, fugiat vero aliquam voluptatibus, eos
            repellat soluta aperiam possimus rem quae magni maxime voluptatem
            ipsa quos voluptatum porro. Quis voluptatum minima neque officiis
            tempora magni nisi ab facilis error ipsa, iusto doloribus ipsum unde
            corrupti. Dolorem veniam quidem et, sint fugiat quas? Explicabo
            eaque itaque tempore quod.
          </p>
        </div>
        <OtherArticle />
      </div>
    </div>
  );
};

export default DetailArticle;
