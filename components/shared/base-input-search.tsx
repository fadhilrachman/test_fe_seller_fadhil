import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { Input } from '../ui/input';
interface Props {
  placeholder?: string;
  className?: string;
  onChange: (text: string) => void;
}
const BaseInputSearch = ({ onChange, placeholder, className }: Props) => {
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="relative !w-full ">
      <Search className="absolute left-2 top-2 h-5 w-5 text-primary text-slate-400" />
      <Input
        // onChange={(e) => {
        //   setText(e.target.value);
        // }}
        placeholder={placeholder}
        className={`w-full bg-white pl-8 text-black md:max-w-sm ${className}`}
      />
    </div>
  );
};

export default BaseInputSearch;
