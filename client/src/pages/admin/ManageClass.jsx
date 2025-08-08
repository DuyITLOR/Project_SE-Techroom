import React, { useState } from "react";
import AddForm from "../../components/AddForm";

const ManageClass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
  ];

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>
          Click here to open add form
        </button>
      )}
      <AddForm fields={fields} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ManageClass;
