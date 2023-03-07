import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';


const Users = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState([{
        "id": 1,
        "email": "nilesh@gmail.com",
        "password": "Nilesh@123",
        "name": "Nilesh Bandhiya"
    },
        {
            "id": 2,
            "email": "hetakshi@gmail.com",
            "password": "Hetakshi@123",
            "name": "Hetakshi Patel"
        },
        {
            "id": 3,
            "email": "tulsi@gmail.com",
            "password": "Tulsi@123",
            "name": "Tulsi Hudka"
        },
        {
            "id": 4,
            "email": "krinal@gmail.com",
            "password": "Krinal@123",
            "name": "Krinal Sonara"
        },
        {
            "id": 5,
            "email": "renuka@gmail.com",
            "password": "Renuka@123",
            "name": "Renuka Varsani"
        }]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName :"ID" , field: 'id', filter: true },
        { headerName :"Name" , field: 'name', filter: true },
        { headerName :"Password" , field: 'password', filter: true },
        { headerName :"Email" ,field: 'email', filter: true },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        flex: 1, filter: true,
        // floatingFilter: true  
    }));

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    // useEffect(() => {
    //     fetch('https://www.ag-grid.com/example-assets/row-data.json')
    //         .then(result => result.json())
    //         .then(rowData => setRowData(rowData))
    // }, []);

    const   buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <div>

            <button onClick={buttonListener}>Push Me</button>

            <div className="ag-theme-alpine" style={{ height: 800}}>

                <AgGridReact
                    ref={gridRef}

                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowSelection='multiple'

                    onCellClicked={cellClickedListener}
                />
            </div>
        </div>
    );
};

export default Users;
