import React, {useEffect, useState} from "react";

const AddForm = ({ fields, isOpen, setIsOpen, onSubmit}) => {
  const [formData, setFormData] = useState(() => 
    Object.fromEntries(fields.map(field => [field.name, ""])));

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(Object.fromEntries(fields.map(field => [field.name, ""])));
      setSubmitted(false);
      setError("");
    }
  }, [isOpen, fields])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleAdd = async () => {
      setError("")
      setSubmitted(true)
      try {
        await onSubmit?.(formData)
        setIsOpen(false)
      } catch (err) {
        setError(err?.response?.data?.message || "An error occurred while submitting the form.");
      } finally {
        setSubmitted(false);
      }
  }

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
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </div>
              ))}
            </form>

            {error && (
              <p className="text-red-600 text-2xl">
                {error}
              </p>
            )}


            <div className="flex ml-auto gap-6">
              <button
                onClick={() => {
                  console.log("Cancel"), setIsOpen(false);
                }}
                className="flex gap-1 text-black text-[18px] px-2 py-2 cursor-pointer">
                <p>Cancel</p>
              </button>
              <button
                onClick={handleAdd}
                className="flex gap-1 text-black text-[18px] px-2 py-2 cursor-pointer disabled:opacity-20"
                disabled = {submitted}
                >
                <p>{submitted ? "Adding..." : "ADD"}</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddForm;
