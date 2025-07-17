import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
      <BrainCircuit className="h-8 w-8 text-primary" />
      <span className="font-headline">
        Data<span className="text-primary">Neuron</span>
      </span>
    </Link>
  );
}
