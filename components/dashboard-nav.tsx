'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { Logs } from 'lucide-react';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  console.log('isActive', isMobileNav, isMinimized);

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const listHrefSubMenu = item.subMenu?.map((val) => val.href);
          console.log({
            path,
            href: listHrefSubMenu?.includes(path)
          });

          const Icon = Icons[item.icon || 'arrowRight'];
          return (
            item.href && (
              <div key={index}>
                {!item.subMenu ? (
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex h-[38px]  items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent'

                      // item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                ) : (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full !border-none"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={`${
                          listHrefSubMenu?.includes(path)
                            ? 'bg-accent'
                            : 'transparent'
                        } h-[38px] rounded-md  pr-2 hover:bg-accent hover:text-accent-foreground`}
                      >
                        {' '}
                        <div
                          // href={item.disabled ? '/' : item.href}
                          className={cn(
                            'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium ',
                            path === item.href ? 'bg-accent' : 'transparent',
                            item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                          onClick={() => {
                            if (setOpen) setOpen(false);
                          }}
                        >
                          <Icon className={`ml-3 size-5 flex-none`} />

                          {isMobileNav || (!isMinimized && !isMobileNav) ? (
                            <span className="mr-2 truncate">{item.title}</span>
                          ) : (
                            ''
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="relative pl-5">
                        <div
                          // style={}
                          style={{
                            height: `${(item.subMenu.length - 1) * 37 + 17}px`
                          }}
                          className={`absolute inline-block min-h-[1em] w-0.5 self-stretch bg-border dark:bg-white/10`}
                        ></div>
                        <div className="ml-1 space-y-2 pt-2">
                          {item.subMenu.map((res, index2) => {
                            return (
                              <Link
                                href={res.href}
                                className={cn(
                                  ' relative ml-2 flex h-[28px] items-center  gap-2 rounded-md py-2 pl-2 text-[13px]  font-medium hover:bg-accent hover:text-accent-foreground',
                                  path === res.href
                                    ? 'bg-accent'
                                    : 'transparent'
                                  // item.disabled &&
                                  //   'cursor-not-allowed opacity-80'
                                )}
                                onClick={() => {
                                  if (setOpen) setOpen(false);
                                }}
                              >
                                <img
                                  src="/slider.svg"
                                  className="absolute -left-3 top-2"
                                />
                                {isMobileNav ||
                                (!isMinimized && !isMobileNav) ? (
                                  <span className="mr-2 truncate">
                                    {res.title}
                                  </span>
                                ) : (
                                  ''
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
