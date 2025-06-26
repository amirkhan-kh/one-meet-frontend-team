import pageInfo from "../../../db/pageInfo";
import { useLocation } from "react-router-dom";

const HoveredInfo = ({ hoveredItem }) => {
  const location = useLocation();
  
  // hoveredItem bo‘lsa, o‘sha yo‘l uchun info olinadi, aks holda current location
  const path = hoveredItem?.pathName || location.pathname;
  const info = pageInfo[path];
  

  return (
    <div className=" w-full p-4 text-black ">
      {hoveredItem ? (
        <>
          <p>{info?.title || "Ma'lumot mavjud emas."}</p>
        <p>{info?.description || "Hover qilinganda ma'lumot shu yerda chiqadi."}</p>

        </>
      ) : (
        <p>{info?.description}</p>
      )}
    </div>
  );
};

export default HoveredInfo;
