import { FcBullish, FcLeftDown, FcCalendar } from "react-icons/fc";

export default function Sidebar({
  handleBestReviewed,
  handleWorstReviewed,
  handleNewlyReleased,
}) {
  return (
    <>
      <div className="sidebar flex flex-col fixed top-0 left-0 w-24 h-screen items-center justify-center bg-slate-800 text-black z-10 gap-10">
        <SideBarIcon
          icon={
            <FcBullish
              onClick={() => handleBestReviewed()}
              size="42"
              className="hover:scale-125 cursor-pointer bg-gray-600 p-2 rounded-full hover:bg-green-500 hover:rounded-xl transition-all"
            />
          }
          text="Best reviewed games"
        />
        <SideBarIcon
          icon={
            <FcLeftDown
              onClick={() => handleWorstReviewed()}
              size="42"
              className="hover:scale-125 cursor-pointer  bg-gray-600 p-2 rounded-full hover:bg-green-500 hover:rounded-xl transition-all"
            />
          }
          text="Worst reviewed games"
        />
        <SideBarIcon
          icon={
            <FcCalendar
              onClick={() => handleNewlyReleased()}
              size="42"
              className="hover:scale-125 cursor-pointer  bg-gray-600 p-2 rounded-full hover:bg-green-500 hover:rounded-xl transition-all"
            />
          }
          text="Newly released games"
        />
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
const SideBarIcon = ({ icon, text = "test" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="tooltip group-hover:scale-100">{text}</span>
  </div>
);
