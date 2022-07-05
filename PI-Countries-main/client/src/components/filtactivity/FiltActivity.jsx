import React from "react";
import { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, filterActivity  } from "../../redux/actions/index";

export default function FilterByActivity({setCurrentPage}) {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.stateActivity)

    function handleChange(e) {
        dispatch(filterActivity(e.target.value))
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getActivities())
    },[dispatch])

    console.log(allActivities);
    return(

        <div>
            <div>
                <select onChange={e => handleChange(e)}>
                    <option value="All">All</option>
                    {allActivities? allActivities.map(e => 
                        <option key={e.name}>{e.name}</option>
                        )
                        : <div><option>Loading</option></div>
                    }
                    </select>
                    </div>
        </div>
    )
}