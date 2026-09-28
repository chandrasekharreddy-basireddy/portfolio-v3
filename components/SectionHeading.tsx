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
      <div className="reveal">
        <p className="lede-label">
          <em>{index}</em>
          {label}
        </p>
      </div>

      <div>
        <div className="reveal" style={{ transitionDelay: "60ms" }}>
          <h2 className="lede-title">{title}</h2>
        </div>
        {body ? (
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <p className="lede-body">{body}</p>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
