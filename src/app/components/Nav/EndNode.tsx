import Link from "next/link";
// import { useRecoilState } from "recoil";

export default function EndNode(props : {
    name : string,
    link : string,
    path : number[]
}){
    // const [path, setPath] = useRecoilState(pathState);
    const nodeRender = (
        <Link href={props.link} //onClick={()=>setPath(props.path)}
        >
            <div className=" text-c00 px-[2rem] py-[0.5rem] hover:text-cff hover:bg-c00 text-center" >
                {props.name}
            </div> 
        </Link>)
        ;
    return nodeRender;
}   