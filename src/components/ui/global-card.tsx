import { Sparkles } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

export interface GCardProps {
  title: string;
  description: string;
  children?: ReactNode;
  href?: string;
  footer?: ReactNode;
}

const GCard = ({ title, description, children,footer }: GCardProps) => {
  return (
    <>
      <Card className="bg-transparent mt-4">
        <CardHeader className="p-4">
          <CardTitle className="text-[13px] font-medium flex gap-3 text-foreground">
            <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.5} /> {title}</CardTitle>
          <CardDescription className="mb-3 text-[12px] leading-snug text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        {children &&<div className="p-4">{children}</div>}
        {footer && <CardFooter className="p-4">{footer}</CardFooter>}
      </Card>
    </>
  );
};

export default GCard;