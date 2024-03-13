import { Link } from "react-router-dom";

const SidebarLogo = () => {
  return (
    <Link
      to="/"
      className="visible h-[60px] w-3/5 text-center text-lg text-black-100 group-[.is-collapsed]/sidebar:invisible"
    >
      DASH MULTAS
    </Link>
  );
};

export default SidebarLogo;
