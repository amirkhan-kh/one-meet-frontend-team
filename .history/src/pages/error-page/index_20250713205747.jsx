import Lottie from 'lottie-react';
import animationDataEror from '../../../public/animation/Tomato Error.json'
const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
     <Lottie
          animationData={animationDataEror}
          loop
          autoplay
          style={{ height: "150px", width: "150px" }}
        />
      <h1 className="text-[20px] font-bold text-red-400">404 - Page Not Found</h1>
      <p className="text-[] mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;
