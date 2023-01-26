import React, { useEffect, useState } from 'react'

const ShowDetails = () => {

    const [appList, setAppList] = useState([])
    const [appValue, setAppValue] = useState("")
    const [fiteredApp, setFiteredApp] = useState([]);
    const [displayDetails, setDisplayDetails] = useState()

    useEffect(() => {
        fetch('https://engineering-task.elancoapps.com/api/applications')
            .then((response) => response.json())
            .then((data) => setAppList(data));

    }, [])

    useEffect(() => {
        if(fiteredApp && fiteredApp.length > 0){
            setFunction();
        }
    }, [fiteredApp])
    
    const filterByName = (appName) => {
        let name = appName;
        fetch('https://engineering-task.elancoapps.com/api/applications/'+name)
            .then((response) => response.json())
            .then((data) => setFiteredApp(data));
    }

    console.log("fiteredApp",fiteredApp);
    const selectApp = (e)=>{
        setAppValue(e.target.value)
    }

    const onFIlter = (e) => {
        e.preventDefault();
        filterByName(appValue)
    }

    const setFunction = () =>{
        const result = fiteredApp && fiteredApp.map(val=>{
            console.log("val",val);
            return(
                [{
                    title:"ConsumedQuantity",
                    value:val.ConsumedQuantity
                },{
                    title:"Cost",
                    value:val.Cost
                },{
                    title:"Date",
                    value:val.Date
                },{
                    title:"InstanceId",
                    value:val.InstanceId
                },{
                    title:"Location",
                    value:val.Location
                },{
                    title:"MeterCategory",
                    value:val.MeterCategory
                },{
                    title:"ResourceGroup",
                    value:val.ResourceGroup
                },{
                    title:"ResourceLocation",
                    value:val.ResourceLocation
                },{
                    title:"ServiceName",
                    value:val.ServiceName
                }]
            )
        })
        
        setDisplayDetails(result);
    }
    
    
    return (
        <>
        <div style={{margin:"10px" }}>
            ShowDetails
            <div style={{display:"flex", marginTop:"10px"}}>
                <select value={appValue} onChange={selectApp} >
                    {appList.map((a, b) => {
                        return (
                            <option value={a}>{a}</option>
                        )
                    })}
                </select>
                <button type="submit" onClick={onFIlter} style={{marginLeft:"5px"}}>Filter</button>
            </div>
        </div>
        <div>
            {
                displayDetails && displayDetails.map(val=>{
                    return(
                        <div style={{margin:"10px" , borderBottom:"1px solid"}}>
                        {val.map(inner=>{
                            return(
                                <div><span style={{fontFamily: "cursive"}}>{inner.title}: </span><span >{inner.value}</span></div>
                            )
                        })}
                        <br/>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default ShowDetails