import React from "react";

function PageNotFound() {
  return (
    <div className="font-sans antialiased bg-white">
      <div className="not-found-page">
        <div className="flex flex-col justify-center items-center pt-36 pb-24 lg:px-16 px-6">
          <div className="rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <p className="not-found-header md:text-3xl text-2xl mb-4">
              404 Page Not Found
            </p>
            <p className="font-light">
              Oops! The page you're looking for does not exist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
