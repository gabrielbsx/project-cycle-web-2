import { Footer } from "../footer";
// import { Header } from "../header";

interface CycleNeutralTemplateProps {
  children: React.ReactNode;
}

export const CycleNeutralTemplate = (props: CycleNeutralTemplateProps) => {
  return (
    <div
      className={`flex flex-col gap-4 justify-between min-h-screen bg-white dark:bg-neutral-900`}
    >
      <div className="flex flex-col gap-4">
        {/* <Header /> */}
        <main>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};
