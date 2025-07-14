import type { ChildrenPropType } from "../../types/children";

export default function Section({ children }: ChildrenPropType) {
  return <section className="px-4 sm:px-6 lg:px-8 py-8">{children}</section>;
}
