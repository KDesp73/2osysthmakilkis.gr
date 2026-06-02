import PageTitle from "./PageTitle";

/** @deprecated Prefer PageTitle with optional subtitle */
export default function Title({ name }: { name: string }) {
  return <PageTitle title={name} />;
}
