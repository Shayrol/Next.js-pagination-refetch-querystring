import Header from "./header/header";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
}
