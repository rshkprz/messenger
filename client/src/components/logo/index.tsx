import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  url?: string;
  showText?: boolean;
  imgClass?: string;
  textClass?: string;
}

export default function Logo({
  url = "/",
  showText = true,
  imgClass,
  textClass,
}: LogoProps) {
  return (
    <Link to={url} className="flex items-center w-fit">
      <img src={logo} alt="messenger" className={cn(imgClass)} />
      {showText && (
        <span className={cn("font-semibold text-lg leading-tight", textClass)}>
          Messenger
        </span>
      )}
    </Link>
  );
}
