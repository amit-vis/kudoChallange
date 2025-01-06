import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import "./chartStyle.css"
import { useDash } from '../../context/dashboard';

const KudosDashboard = () => {
    const {dashUserData, getUserDash,getKudosData, dashKudo, getMostLiked, mostLike} = useDash();
    console.log(mostLike)
    const kudos = dashKudo?.[0]?.kudoDetails?.kudos

    useEffect(()=>{
        getUserDash();
        getKudosData();
        getMostLiked();
    },[])
    // Data for the bar chart
    const chartData = [
        { name: 'Helping Hand', kudos: 10 },
        { name: 'Excellence', kudos: 7 },
        { name: 'Above and Beyond', kudos: 3 },
        { name: 'Client Focus', kudos: 5 }
    ];

    // Data for the leaderboard
    const leaderboardData = [
        { name: 'Jay', kudos: 10 },
        { name: 'Jill', kudos: 8 },
        { name: 'Johnny', kudos: 5 },
        { name: 'Gabe', kudos: 2 }
    ];

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '5%'
            }}>
                <div>
                    <h6 className='text-center'>given kudos</h6>
                    <BarChart width={600} height={300} barSize={30} data={dashKudo}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="kudoDetails.kudos" />
                        <YAxis domain={[0, 12]} ticks={[0, 2, 4, 6, 8, 10, 12]} />
                        <Bar
                            dataKey="count"
                            fill="#2196F3"
                            radius={[4, 4, 0, 0]}
                            
                        />
                      
                    </BarChart>
                </div>
                <div style={{ width: '40%' }}>
                    <table class="table custom-table align-middle table-striped">
                        <thead class="table-primary">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Number Of Kudos received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashUserData?.map((data)=>(
                                <tr key={data._id}>
                                <td>{data.userDetails.name}</td>
                                <td>{data?.count}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="mt-8 text-gray-800 text-center mt-5 fw-bold" style={{zIndex: 1}}>
                    <p className="font-medium">
                        Most liked post: {mostLike?.fromUser} "{kudos}" Badge to {mostLike?.toUser} – "{mostLike?.reason}"
                    </p>
                </div>
        </>
    );
};

export default KudosDashboard;