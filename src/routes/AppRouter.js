import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Stations from "../pages/Stations";
import Station from "../pages/Station";
import PlanTrip from "../pages/PlanTrip";
import StationETD from "../components/StationETD";
import StationSchedules from "../components/StationSchedules";

const AppRouter = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations />}  />
            <Route path="/station/:id" element={<Station />}  />
            <Route path="/plantrip" element={<PlanTrip />}  />
            <Route path="/realtime/:id" element={<StationETD  id={"12TH"}/>} /> //todo
            <Route path="/schedule/:id" element={<StationSchedules id={"12TH"}/>} /> //todo
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
    
};

export default AppRouter;