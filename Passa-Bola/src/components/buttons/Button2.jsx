import React from 'react'

const Button2 = (props) => {
  const text = props.text || "button"
    const color = props.color || "1"
    if(color == "1"){
        return(
            <button
            className='
            text-[var(--corTer)]
            p-2
            border
            border-[--corTer]
            rounded-sm
            hover:bg-[var(--corTer)]
            hover:text-[var(--corPri)]
            transition-transform
            active:scale-95
            '
            >{text}</button>
        )
    }else if(color == "2"){
        return (<button
            className='
            text-[var(--corPrim)]
            bg-[var(--corTer)]
            p-2
            border
            border-[--corTer]
            rounded-sm
            hover:bg-[var(--corPrim)]
            hover:text-[var(--corTer)]
            transition-transform
            active:scale-95
            '
            >{text}</button>)
    }
}

export default Button2