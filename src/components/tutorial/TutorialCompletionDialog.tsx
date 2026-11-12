import { useEffect, useRef } from "react";
import { tutorialParaibaDigitalContent as content } from "../../content/tutorial/paraiba-digital";
import completionIllustration from "../../assets/tutorial/guia-concluido.png";
import externalLink from "../../assets/tutorial/external-link.svg";

export function TutorialCompletionDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    heading.current?.focus();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <dialog ref={dialog} className="tutorial-completion-dialog" aria-modal="true"
    aria-labelledby="tutorial-completion-title" aria-describedby="tutorial-completion-description tutorial-completion-guidance"
    onClose={event => { if (!event.currentTarget.open) onClose(); }}
    onKeyDown={event => {
      if (event.key !== "Tab") return;
      const links = event.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]");
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }}>
    <img className="tutorial-completion-illustration" src={completionIllustration}
      alt="Ilustração de conclusão do guia de publicação" />
    <h2 id="tutorial-completion-title" ref={heading} tabIndex={-1}>{content.completion.title}</h2>
    <p id="tutorial-completion-description">{content.completion.description}</p>
    <p id="tutorial-completion-guidance">{content.completion.guidance}</p>
    <div className="tutorial-completion-actions">
      <a className="tutorial-button tutorial-button--secondary" href="/">{content.completion.homeLabel}</a>
      <a className="tutorial-button" href={content.officialPlatformUrl} target="_blank" rel="noopener noreferrer">
        {content.completion.platformLabel}<img src={externalLink} width={16} height={16} alt="" />
        <span className="tutorial-sr-only"> (abre em nova aba)</span>
      </a>
    </div>
  </dialog>;
}
