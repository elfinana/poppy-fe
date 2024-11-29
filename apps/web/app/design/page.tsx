'use client';
import { usePlanForm } from '@/src/features/usePlanForm';
import { BookSheet } from '@/src/shared/ui/book/bookSheet';
import React from 'react';

const Page = () => {
  const { formData, onSelect, selectable } = usePlanForm();
  return <BookSheet formData={formData} onSelect={onSelect} selectable={selectable} />;
};

export default Page;
