import React from "react";
import { Suspense, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import Loading from "../components/loading/Loading";
import Home from "./home/Home";
import AddToMobile from "../components/addToMobile/AddToMobile";

const StaticMap = React.lazy(() => import("./map/StaticMap"));
const Setting = React.lazy(() => import("./setting/Setting"));
const Resources = React.lazy(() => import("./resources/Resources"));
const NotFound = React.lazy(() => import( "./notFound/NotFound"));
const Version = React.lazy(() => import("./version/Version"));
const Utilities = React.lazy(() => import("./utilities/Utilities"));
const Map = React.lazy(() => import("./map/Map"));

import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {

    function isRunningStandalone() {
        return (window.matchMedia('(display-mode: standalone)').matches);
    }

    const [hasAdded, setHasAdded] = useState(!isRunningStandalone());

   
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route
                        path='*'
                        element={
                            <>
                                <Navbar />
                                <NotFound />
                            </>
                        }
                    />
                    <Route
                        exact path='/'
                        element={
                            <>
                                <Navbar />
                                <Home />
                            </>
                        }
                    />
                    <Route exact path='/map' element={
                        <>
                            <Map />
                        </>
                    } />
                    <Route
                        exact
                        path='/static-map'
                        element={
                            <>
                                <StaticMap />
                            </>
                        }
                    />
                    <Route
                        exact
                        path='/settings'
                        element={
                            <>
                                <Navbar type = {1} />
                                <Setting init={false} />
                            </>
                        }
                    />
                    <Route
                        exact
                        path='/resources'
                        element={
                            <>
                                <Navbar />
                                <Resources />
                            </>
                        }
                    />
                    <Route 
                        exact
                        path='/utilities'
                        element={
                            <>
                                <Navbar />
                                <Utilities />
                            </>
                        }
                    />
                    <Route 
                        exact
                        path='/version'
                        element={
                            <>
                                <Navbar />
                                <Version />
                            </>
                        }
                    />

                </Routes>
                
            </Suspense>

            <AddToMobile hasAdded = {hasAdded} setHasAdded = {setHasAdded} />

        </>
    );
};

export default AppRoutes;
