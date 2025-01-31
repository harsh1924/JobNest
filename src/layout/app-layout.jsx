import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return ( 
        <div className="">
            App Layouthog
            <Outlet />
        </div>
     );
}
 
export default AppLayout;