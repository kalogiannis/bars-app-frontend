import React from 'react';

type DescriptionTabProps ={
  description: string;
}

const DescriptionTab= ({ description }: DescriptionTabProps) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Description</h2>
    <p className="leading-relaxed">{description}</p>
  </div>
);

export default DescriptionTab;