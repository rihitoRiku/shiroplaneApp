import React from "react";

function Alert({ message, countdown }) {
  return (
    <>
      <div className="alert alert-danger pt-2 ps-2" role="alert">
        {message}
        <span> Auto closed on {countdown}...</span>
      </div>
    </>
  );
}

// const AlertValidation = ({ message }) => {
//   return (
//     <>
//       <div className="alert alert-danger pt-2 ps-2" role="alert">
//         {message}
//         <span> Auto closed on ...</span>
//       </div>
//     </>
//   );
// };

export default Alert;
