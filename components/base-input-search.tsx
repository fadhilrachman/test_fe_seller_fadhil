import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';
interface Props {
  placeholder?: string;
  onChange: (text: string) => void;
}
const BaseInputSearch = ({ onChange, placeholder }: Props) => {
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2 h-5 w-5 text-primary" />
      <Input
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full pl-8 md:max-w-sm"
      />
    </div>
  );
};

export default BaseInputSearch;
