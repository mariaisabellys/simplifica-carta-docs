import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ExploreStepCard } from "./ExploreStepCard";
import { explorePageContent } from "../../content/pages/explorar-por-etapas";
import helpCircle from "../../assets/explorar-por-etapas/help-circle.svg";
import checkSquare from "../../assets/explorar-por-etapas/check-square.svg";
import fileText from "../../assets/explorar-por-etapas/file-text.svg";
import bookOpen from "../../assets/explorar-por-etapas/book-open.svg";

const stepIcons = [helpCircle, checkSquare, fileText, bookOpen] as const;

export function ExploreStepsCarousel() {
  const track = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const element = track.current!;
    const update = () => setEdges({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    const items = element.children;
    const distance = items.length > 1
      ? (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft
      : element.clientWidth;
    element.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className="explore-carousel" aria-labelledby="explore-carousel-title" aria-roledescription="carrossel">
      <div className="explore-carousel__header">
        <h2 id="explore-carousel-title" className="sr-only">Etapas do manual</h2>
        {!(edges.start && edges.end) && <div className="explore-carousel__controls" aria-label="Navegação das etapas">
          <button type="button" aria-label="Etapa anterior" aria-controls="explore-carousel-track" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" aria-label="Próxima etapa" aria-controls="explore-carousel-track" disabled={edges.end} onClick={() => move(1)}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>}
      </div>
      <p id="explore-carousel-help" className="sr-only">Use as setas do teclado ou os controles para explorar as quatro etapas. Em telas sensíveis ao toque, deslize para os lados.</p>
      <ol id="explore-carousel-track" className="explore-carousel__track" ref={track} tabIndex={0}
        aria-label="Etapas do manual" aria-describedby="explore-carousel-help"
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        {explorePageContent.steps.map((step, index) => <li key={step.id}><ExploreStepCard step={step} icon={stepIcons[index]} /></li>)}
      </ol>
    </section>
  );
}
