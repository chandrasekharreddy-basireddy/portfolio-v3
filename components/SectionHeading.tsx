import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  body?: string;
  id?: string;
  deep?: boolean;
  children: React.ReactNode;
};

export function SectionHeading({
  index,
  label,
  title,
  body,
  id,
  deep,
  children,
}: SectionHeadingProps) {
  return (
    <section
      id={id}
      className={`section lede-grid ${deep ? "section--deep" : "section--ruled"}`}
    >
      <Reveal>
        <p className="lede-label">
          <em>{index}</em>
          {label}
        </p>
      </Reveal>

      <div>
        <Reveal delay={60}>
          <h2 className="lede-title">{title}</h2>
        </Reveal>
        {body ? (
          <Reveal delay={120}>
            <p className="lede-body">{body}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
