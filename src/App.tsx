import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Container, Divider, Grid } from '@mui/material';
import StateTable from './Components/StateTable';
import DistrictTable from './Components/DistrictTable';
import SchoolTable from './Components/SchoolTable';
import Toolbox from './Components/Toolbox';
import { csv } from 'd3-fetch';
import { stateUpdateWrapperUseJSON } from './Interface/StateChecker';


export const CategoryContext = createContext<{ [key: string]: string; }[]>([]);

function App() {
    const [courseCategorization, setCourseCategorization] = useState([]);

    useEffect(() => {
        //category
        csv("/data/category.csv").then((categorization) => {
            stateUpdateWrapperUseJSON(courseCategorization, categorization, setCourseCategorization);
        });
    }, []);

    return (
        <CategoryContext.Provider value={courseCategorization}>
            <div className="App" style={{ overflow: 'hidden' }}>
                <Container id="state-view" style={{ maxWidth: '100vw', paddingTop: "24px", paddingBottom: "24px" }}>
                    <StateTable />
                </Container>
                <Divider />
                <Container style={{ maxWidth: '100vw', paddingTop: "24px", paddingBottom: "24px" }}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Toolbox />
                        </Grid>
                        <Grid item xs={5} style={{ maxHeight: '68vh' }} overflow='auto'>
                            <DistrictTable />
                        </Grid>
                        <Grid item xs={5}>
                            <SchoolTable />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </CategoryContext.Provider>
    );
}

export default App;
