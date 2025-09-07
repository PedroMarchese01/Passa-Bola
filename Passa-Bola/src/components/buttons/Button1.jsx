import React from "react";

const Button1 = (props) => {
    const text = props.text || "button"
    const color = props.color || "1"
    if(color == "1"){
      return (
        <button
        className="
        text-[var(--corSec)]
        p-2
        border
        border-[var(--corSec)]
        rounded-sm
        hover:bg-[var(--corSec)]
        hover:text-[var(--corPri)]
        "
        >
          {text}
        </button>
      );}
      else if(color == "2"){
         return (
        <button
        className="
        text-[var(--corPrim)]
        bg-[var(--corTer)]
        p-2
        border
        border-[--corSec]
        rounded-sm
        hover:bg-[var(--corPrim)]
        hover:text-[var(--corSec)]
        transition-transform
          active:scale-95
        "
        >
          {text}
        </button>)
      }
};

export default Button1;