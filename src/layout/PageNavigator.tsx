type PageNavigatorSection = {
  id: string;
  label: string;
  iconClass: string; // bootstrap icon class
};

type PageNavigatorProps = {
  sections?: PageNavigatorSection[];
};

const defaultSections: PageNavigatorSection[] = [
  { id: "contact", label: "Contact", iconClass: "bi-phone" },
];

const PageNavigator = ({ sections = defaultSections }: PageNavigatorProps) => {
  const allSections = [
    ...sections,
    { id: "contact", label: "Contact", iconClass: "bi-telephone" },
  ];

  return (
    <div
      className="position-fixed top-50 start-0 translate-middle-y d-flex flex-column"
      style={{ zIndex: 1040 }}
    >
      {allSections.map(({ id, label, iconClass }, index) => (
        <a
          key={`${id}-${index}`}
          href={`#${id}`}
          className="btn btn-dark ms-4 rounded-3 border-0 btn-sm p-2 my-2 text-decoration-none"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={label}
        >
          <i className={`bi ${iconClass}`} />
        </a>
      ))}
    </div>
  );
};

export default PageNavigator;
