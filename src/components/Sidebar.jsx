import { FaChartBar, FaGlobeAmericas } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-[75px] p-3 h-screen fixed">
      <div className="flex flex-col gap-4 items-center justify-center">
        <img
          src="https://cms.engauge.odyssey.co.id/resources/images/logo.svg"
          alt="engauge"
        />
        <div
          className={`text-xl cursor-pointer p-2 ${location.pathname === "/" ? "bg-red-700 rounded-sm text-white" : ""}`}
          onClick={() => navigate("/")}
        >
          <FaGlobeAmericas />
        </div>
        <div
          className={`text-xl cursor-pointer p-2 ${location.pathname === "/test-result" ? "bg-red-700 rounded-sm text-white" : ""}`}
          onClick={() => navigate("/test-result")}
        >
          <FaGlobeAmericas />
        </div>
        <div
          className={`text-xl cursor-pointer p-2 ${location.pathname === "/other" ? "bg-red-700 rounded-sm text-white" : ""}`}
          onClick={() => navigate("/other")}
        >
          <FaChartBar />
        </div>
      </div>
    </div>
  );
}
