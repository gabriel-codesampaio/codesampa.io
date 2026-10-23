import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Step = {
  title: string;
  duration: string;
  description: string;
  deliverable: string;
};

type Faq = { question: string; answer: string };

// Como é trabalhar com a gente, em etapas do cliente (não em camadas de stack).
// Componente de servidor: só conteúdo, sem JS nem animação contínua.
// FAQ oculto por enquanto (textos continuam em Pages.Home.Process.faq)
export function ProcessSection({ showFaq = false }: { showFaq?: boolean }) {
  const t = useTranslations('Pages.Home.Process');
  const steps = t.raw('steps') as Step[];
  const faq = t.raw('faq') as Faq[];

  return (
    <section
      aria-labelledby="process-title"
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2
            id="process-title"
            className="mb-4 font-space text-4xl font-bold md:text-5xl"
          >
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col rounded-3xl border border-border bg-card p-6"
            >
              <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-space text-base font-bold text-primary-text">
                {i + 1}
              </span>
              <h3 className="mb-1 font-space text-xl font-bold">
                {step.title}
              </h3>
              <p className="mb-4 text-sm font-medium text-primary-text">
                {step.duration}
              </p>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <p className="border-t border-border/60 pt-4 text-sm text-foreground/90">
                <span className="font-bold">{t('deliverable_label')}</span>{' '}
                {step.deliverable}
              </p>
            </li>
          ))}
        </ol>

        {showFaq && (
          <div className="mx-auto mt-24 max-w-3xl">
            <h2 className="mb-8 text-center font-space text-3xl font-bold md:text-4xl">
              {t('faq_title')}
            </h2>

            <div className="divide-y divide-border rounded-3xl border border-border bg-card">
              {faq.map((item) => (
                <details key={item.question} className="group px-6">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-bold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-6 leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
