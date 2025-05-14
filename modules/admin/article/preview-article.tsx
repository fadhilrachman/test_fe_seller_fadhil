import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArticleType } from '@/types/article.type';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ArticleType;
}

const PreviewArticle = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle>Preview Article</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <div className="space-y-10 px-5 ">
            {/*  */}
            <div className="space-y-4 sm:space-y-6 md:space-y-10">
              <div>
                <div className=" mx-auto max-w-[642px] space-y-4 text-center">
                  {props?.data?.created_at && (
                    <p className="text-sm text-slate-600">
                      {moment(props.data?.created_at).format('MMMM D, YYYY')}
                    </p>
                  )}

                  <h3 className="text-2xl font-semibold md:text-3xl">
                    {props?.data?.title}
                  </h3>
                </div>
              </div>
              <img
                src={props.data?.thumbnail || '/content1.jpg'}
                alt=""
                className=" mx-auto max-w-[600px]"
              />
              <p className="pb-7 text-slate-700">
                {parse(props?.data?.content || '')}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default PreviewArticle;
