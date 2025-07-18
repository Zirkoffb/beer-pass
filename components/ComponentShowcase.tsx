
import React from 'react';

interface ComponentShowcaseProps {
  title: string;
  children: React.ReactNode;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ title, children }) => (
  <section className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-slate-200 text-slate-700">{title}</h2>
    <div className="flex flex-wrap items-start gap-8">
      {children}
    </div>
  </section>
);
