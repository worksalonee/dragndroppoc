import { useDrag } from "react-dnd";

const Dragitempoc = ({ name, fieldName, color = "text-gray-800",placeHolder }) => {
  console.log(placeHolder, "placeHolder in dragitempoc");
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { fieldName,placeHolder },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      name={name}
      className={` min-w-max bg-white ${color} w-full h-fullfont-medium py-2 rounded shadow cursor-move hover:shadow-md transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {fieldName}
    </button>
  );
};

export default Dragitempoc;