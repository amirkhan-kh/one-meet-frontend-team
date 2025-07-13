import Lottie from 'lottie-react';
import animationDataEror from '../../../public/animation/Tomato Error.json'
const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
     <Lottie
          animationData={animationDataEror}
          loop
          autoplay
          style={{ height: "200px", width: "380px" }}
        />
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFoundPage;
