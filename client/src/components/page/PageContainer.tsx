import type { ChildrenPropType } from "../../types/children";

export default function PageContainer({ children }: ChildrenPropType) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
