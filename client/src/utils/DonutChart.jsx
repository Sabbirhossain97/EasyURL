import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FaInbox } from "react-icons/fa";

function DonutChart({ urlStats }) {

    const COLORS = ['#9C8CFF', '#00D4FF', '#FFA1A1'];

    return (
        <div className="mt-10 flex justify-between">
            <div className="bg-[#ecedf0] dark:bg-white/10 rounded-md py-4">
                <h3 className="text-lg font-bold text-center">Referrers</h3>

                {urlStats?.referrerStats?.length === 0 ?
                    <div className='w-[400px] h-[300px] flex flex-col items-center justify-center'>
                        <FaInbox className='w-24 h-24 text-sky-400 dark:text-white' />
                        <h3>No Data</h3>
                    </div> :
                    <>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={urlStats?.referrerStats?.map(item => ({
                                    name: item._id,
                                    value: item.count
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {urlStats?.referrerStats?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    fontSize: 13,
                                }}
                                formatter={(value, name) => [`${value}`, `${name}`]}
                            />
                        </PieChart>
                        <div className="flex-col">
                            <ul className="space-y-2">
                                {urlStats?.referrerStats?.map((referrer, index) => (
                                    <li key={index} className="flex items-center justify-between px-10">
                                        <p className="font-medium flex gap-2 items-center">
                                            <span style={{ backgroundColor: COLORS[index] }} className="rounded-[50%] inline-block w-[15px] h-[15px]" />
                                            <span>{referrer._id}</span>
                                        </p>
                                        <p className="font-semibold">
                                            {referrer.count}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                }
            </div>
            <div className="bg-[#ecedf0] dark:bg-white/10 rounded-md py-4">
                <h3 className="text-lg font-bold text-center">Browser</h3>
                {urlStats?.browserStats?.length === 0 ?
                    <div className='w-[400px] h-[300px] flex flex-col items-center justify-center'>
                        <FaInbox className='w-24 h-24 text-sky-400 dark:text-white' />
                        <h3>No Data</h3>
                    </div> :
                    <>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={urlStats?.browserStats?.map(item => ({
                                    name: item._id,
                                    value: item.count
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {urlStats?.browserStats?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    fontSize: 13,
                                }}
                                formatter={(value, name) => [`${value}`, `${name}`]}
                            />
                        </PieChart>
                        <div className="flex-col">
                            <ul className="space-y-2">
                                {urlStats?.browserStats?.map((browser, index) => (
                                    <li key={index} className="flex items-center justify-between px-10">
                                        <p className="font-medium flex gap-2 items-center">
                                            <span style={{ backgroundColor: COLORS[index] }} className="rounded-[50%] inline-block w-[15px] h-[15px]" />
                                            <span>{browser._id}</span>
                                        </p>
                                        <p className="font-semibold">
                                            {browser.count}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                }
            </div>
            <div className="bg-[#ecedf0] dark:bg-white/10 rounded-md py-4">
                <h3 className="text-lg font-bold text-center">Platform</h3>
                {urlStats?.platformStats?.length === 0 ?
                    <div className='w-[400px] h-[300px] flex flex-col items-center justify-center'>
                        <FaInbox className='w-24 h-24 text-sky-400 dark:text-white' />
                        <h3>No Data</h3>
                    </div> :
                    <>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={urlStats?.platformStats?.map(item => ({
                                    name: item._id,
                                    value: item.count
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {urlStats?.platformStats?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    fontSize: 13,
                                }}
                                formatter={(value, name) => [`${value}`, `${name}`]}
                            />
                        </PieChart>
                        <div className="flex-col">
                            <ul className="space-y-2">
                                {urlStats?.platformStats?.map((platform, index) => (
                                    <li key={index} className="flex items-center justify-between px-10">
                                        <p className="font-medium flex gap-2 items-center">
                                            <span style={{ backgroundColor: COLORS[index] }} className="rounded-[50%] inline-block w-[15px] h-[15px]" />
                                            <span>{platform._id}</span>
                                        </p>
                                        <p className="font-semibold">
                                            {platform.count}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default DonutChart