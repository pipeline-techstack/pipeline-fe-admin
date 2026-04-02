export interface RevopsTableTypes{
    title:string;
    subtitle:string;
    icon:React.ReactNode;
    data:[];
    columns:[];
    handleViewMore:()=>void
    loading:boolean
}