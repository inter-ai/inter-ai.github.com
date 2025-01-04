import { useTextStore } from "./ZustandStores/TextStore"
export default function Textbox() {
    const {text, setText} = useTextStore();
    const changeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }
    return (
        <div className=" w-full h-full">
          <textarea
            // type="text"
            value={text}
            onChange={changeText}
            placeholder="Enter prompt here"
            className=" w-full h-full bg-transparent text-c00 resize-none "
          />
        </div>
      );
}