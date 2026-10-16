// import { CasesSection } from '@/components/pages/home/cases';
import { HeroSection } from '@/components/pages/home/hero';
import { Links } from '@/components/pages/home/links';
import { ManifestoSection } from '@/components/pages/home/manifesto';
import { ProcessSection } from '@/components/pages/home/process';
import { ReadyToBuildSection } from '@/components/pages/home/ready-to-build';
import { ServicesSection } from '@/components/pages/home/services';
import { LazyShapeShifter } from '@/components/pages/home/shape-shifter/lazy';

// Ordem: promessa → prova (cases) → demonstração → oferta → visão →
// como trabalhamos + objeções → CTA
export default function Home() {
  return (
    <div className="mx-auto">
      <HeroSection />
      {/* Oculto por enquanto; para religar, descomente */}
      {/* <CasesSection /> */}
      <LazyShapeShifter />
      <ServicesSection />
      <ManifestoSection />
      <ProcessSection />
      <ReadyToBuildSection />
      <Links />
    </div>
  );
}
