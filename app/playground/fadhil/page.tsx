'use client';

import React, { useState } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { Cat, Dog, FileIcon, Fish, Rabbit, Turtle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormGenerator from '@/components/form-generator';
import { useForm } from 'react-hook-form';

const frameworksList = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' },
  { value: 'ember', label: 'Ember' }
];
const frameworks = [
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'remix',
    label: 'Remix'
  },
  {
    id: 'astro',
    label: 'Astro'
  },
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'remix',
    label: 'Remix'
  },
  {
    id: 'astro',
    label: 'Astro'
  },
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'remix',
    label: 'Remix'
  },
  {
    id: 'astro',
    label: 'Astro'
  },
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'remix',
    label: 'Remix'
  },
  {
    id: 'astro',
    label: 'Astro'
  },
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'remix',
    label: 'Remix'
  },
  {
    id: 'astro',
    label: 'Astro'
  }
];

function Home() {
  const form = useForm();
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    'react',
    'angular'
  ]);

  console.log({ value: form.watch() });

  return (
    <div className="max-w-xl p-4">
      <FormGenerator
        form={form}
        data={[
          {
            name: 'cuy',
            type: 'comobox',
            label: 'Comobox',
            options: frameworks
          },
          {
            name: 'examplefile',
            type: 'upload',
            label: 'Upload'
          }
        ]}
        id="s"
        onSubmit={(val) => {
          console.log({ val });
        }}
        grid="1"
      />
      <h1 className="mb-4 text-2xl font-bold">Multi-Select Component</h1>
      <MultiSelect
        options={frameworksList}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder="Select frameworks"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
        <ul className="list-inside list-disc">
          {selectedFrameworks.map((framework) => (
            <li key={framework}>{framework}</li>
          ))}
        </ul>
      </div>
      <input type="url"></input>
    </div>
  );
}

export default Home;
