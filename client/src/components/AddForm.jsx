import React from "react";

const AddForm = ({ fields, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
          <div className="flex flex-col bg-[#E5E7EB] w-1/4 h-fit px-4 py-4 border-2 rounded-[8px] gap-2">
            <div className="sticky top-0 ml-auto">
              <button
                onClick={() => {
                  console.log("Cancel"), setIsOpen(false);
                }}
                className="text-gray-500 hover:text-black">
                ✕
              </button>
            </div>
            <form className="flex flex-col gap-4 justify-center ">
              {fields.map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    className="border p-2 rounded"
                  />
                </div>
              ))}
            </form>

            <div className="flex ml-auto gap-6">
              <button
                onClick={() => {
                  console.log("Cancel"), setIsOpen(false);
                }}
                className="flex gap-1 text-black text-[18px] px-2 py-2 cursor-pointer">
                <p>Cancle</p>
              </button>
              <button
                onClick={() => {
                  console.log("Add"), setIsOpen(false);
                }}
                className="flex gap-1 text-black text-[18px] px-2 py-2 cursor-pointer">
                <p>Add</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddForm;
