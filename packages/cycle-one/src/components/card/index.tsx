interface CardProps {
  card?: {
    className?: string;
  };
  header: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}

export const Card = (props: CardProps) => {
  return (
    <div
      className={`flex flex-col border rounded mx-auto gap-4 ${props.card?.className}`}
    >
      <header className="flex justify-center border-b p-5">
        {props.header}
      </header>
      <main className="flex px-5 flex-col">{props.main}</main>
      <footer className="border-t flex p-3 justify-center items-center">
        {props.footer}
      </footer>
    </div>
  );
};
