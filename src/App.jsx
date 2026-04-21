import { useState } from "react";
import "./App.css";

function App() {
  const checkBoxesData = [
    {
      id: 1,
      name: "Fruits",
      children: [
        {
          id: 2,
          name: "Citrus",
          children: [
            {
              id: 3,
              name: "Orange",
            },
            {
              id: 4,
              name: "Lemon",
            },
          ],
        },
        {
          id:12,
          name:"Melon",
          children:[
            {
              id:13,
              name:"Watermelon"
            },
            {
              id:14,
              name:"Muskmelon"
            },
          ]
        },
      ],
    },
    {
      id: 5,
      name: "Berries",
      children: [
        {
          id: 6,
          name: "Strawberry",
        },
        {
          id: 7,
          name: "Blueberry",
        },
      ],
    },
    {
      id: 8,
      name: "Tropical",
      children: [
        {
          id: 9,
          name: "Banana",
        },
        {
          id: 10,
          name: "Mango",
        },
        {
          id: 11,
          name: "pineapple",
        },
      ],
    },
  ];

  const [checked, setChecked] = useState({});

  const CheckBoxes = ({ data, checked, setChecked }) => {
  const handleOnChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      //Making the functionality to checked parent's children
      const updateChildren=(node)=>{
        node.children?.forEach((child)=>{
          newState[child.id]=isChecked;
          child.children && updateChildren(child)
        })
      } 
      updateChildren(node)



const verifyChecked = (node) => {
  if (!node.children) return newState[node.id] || false;

  //  First process children
  node.children.forEach((child) => verifyChecked(child));

  //  Then evaluate parent
  const allChildrenChecked = node.children.every(
    (child) => newState[child.id]
  );

  newState[node.id] = allChildrenChecked;

  return allChildrenChecked;
};


      checkBoxesData.forEach(node=> verifyChecked(node))
      verifyChecked(checkBoxesData[0])
      return newState;
    });
  };
  return (
    <div>
      {data.map((node) => {
        return (
          <div className="parent" key={node.id}>
            <input
              type="checkbox"
              onChange={(e) => handleOnChange(e.target.checked, node)}
              checked={checked[node.id] || false}
            />
            <span>{node.name}</span>
            {node.children && (
              <CheckBoxes
                checked={checked}
                setChecked={setChecked}
                data={node.children}
                
              />
            )}
          </div>
        );
      })}
    </div>
  );
};


  return (
    <>
      <CheckBoxes
        data={checkBoxesData}
        checked={checked}
        setChecked={setChecked}
        rootData={checkBoxesData}
      />
    </>
  );
}



export default App;
