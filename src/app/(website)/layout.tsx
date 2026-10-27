import SkiperNavbar from "@/components/ui/navbar";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col py-10 px-10 xl:px-0 container relative min-h-screen">
            <SkiperNavbar />
            <main className="flex-1">{children}</main>
        </div>
    );
  }
export default Layout;