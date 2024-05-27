
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/Input';

interface TagInputProps {
  onChange: (value: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ onChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Input className="w-full" placeholder="Entrer le tag SAP" onChange={handleInputChange} />
  );
};

export default TagInput;
