interface Inputprops {
    placeholder: string;
    reference?: any
}

export function Input({ placeholder, reference}: Inputprops){
    return <div className="flex justify-center items-center w-full">
        <input ref={reference} placeholder={placeholder} type="text" 
        className="w-full max-w-md px-4 py-2 border rounded-lg m-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></input>
    </div>
}