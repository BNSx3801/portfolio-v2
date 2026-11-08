import { contact } from "@/lib/site";

const rowClass = "flex items-start justify-between gap-6 border-b-2 border-dotted border-ink-faint pt-[11px] pb-[12px] first:pt-0";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[696px] px-4 pt-[68px] pb-10">
      <dl className="ml-8 mr-[37px]">
        <div className={rowClass}>
          <dt className="text-ink-muted">Name</dt>
          <dd>{contact.name}</dd>
        </div>
        <div className={rowClass}>
          <dt className="text-ink-muted">Mail</dt>
          <dd>
            <a href={`mailto:${contact.email}`} className="link-underline">
              {contact.email}
            </a>
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="text-ink-muted">Call</dt>
          <dd>
            <a href={contact.callHref} target="_blank" rel="noreferrer" className="link-underline text-ink-muted">
              Schedule a 30-min call ↗
            </a>
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="text-ink-muted">Socials</dt>
          <dd className="flex flex-wrap justify-end gap-x-6 text-ink-muted">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="link-underline">LinkedIn ↗</a>
            <a href={contact.x} target="_blank" rel="noreferrer" className="link-underline">X/Twitter ↗</a>
            <a href={contact.telegram} target="_blank" rel="noreferrer" className="link-underline">Telegram ↗</a>
          </dd>
        </div>
      </dl>
      <div className="ml-8 mr-[37px] flex items-center justify-between pt-[43px] text-[12px] leading-[16px]">
        <p>Last updated on {contact.lastUpdated}</p>
        <a href="#top" className="link-underline">Back to top ↑</a>
      </div>
    </footer>
  );
}
