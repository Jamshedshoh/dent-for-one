import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { Categories } from "./Categories";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <Categories />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};
