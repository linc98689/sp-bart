import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Stations from "../pages/Stations";
import Station from "../pages/Station";
import PlanTrip from "../pages/PlanTrip";

const AppRouter = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />}  />
            <Route path="/station/:id" element={<Station />}  />
            <Route path="/plantrip" element={<PlanTrip />}  />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
    
};

export default AppRouter;