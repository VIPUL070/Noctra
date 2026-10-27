import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="container h-screen flex justify-center items-center" >
            {children}
        </div>
    );
  }
export default Layout;