"use client";

import { EditForm } from '@/components/EditForm';
import { use } from 'react';

type EditBookPageProps = {
    params: Promise<{ id: string }>;
  };

const EditBookPage = ({ params }: EditBookPageProps) => {
    const { id } = use(params)
  return (
    <div className="flex container mx-auto my-6 justify-center">
      <EditForm id={id}/>
    </div>
  );
};

export default EditBookPage;