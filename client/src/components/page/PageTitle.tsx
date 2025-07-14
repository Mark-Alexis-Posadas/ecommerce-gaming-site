import type { ChildrenPropType } from "../../types/children";

export default function PageTitle({ children }: ChildrenPropType) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
      {children}
    </h2>
  );
}
