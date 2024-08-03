/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { forwardRef, useEffect, useState } from 'react';
import logo from './Logo.png'


/* eslint-disable react/prop-types */
export const ReportToPrint = forwardRef((props, ref) => {
    const { monthlyProductData } = props;
    const [premium, setPremium] = useState([]);
    const [surebuild, setSurebuild] = useState([]);
    const [surecem, setSurecem] = useState([]);
    const [sureroad, setSureroad] = useState([]);
    const [surewall, setSurewall] = useState([]);
      
    useEffect(() => {
        let premium = monthlyProductData["Premium 42,5"];
        let surebuild = monthlyProductData["Surebuild"];
        let surecem = monthlyProductData["Surecem"];
        let sureroad = monthlyProductData["Sureroad"];
        let surewall = monthlyProductData["Surewall"];
    
        setPremium(premium);
        setSurebuild(surebuild);
        setSurecem(surecem);
        setSureroad(sureroad);
        setSurewall(surewall);

    }, [monthlyProductData])

    return (
        <div ref={ref} className="w-full mx-auto p-16">
            <div>
                {/* Top bar  */}
                <div className='flex w-full justify-between items-start border-b-2 border-black pb-3'>
                    <div className='flex flex-col w-1/2'>
                        <img src={logo} alt='Cimerwa logo' className='w-2/3 mb-3' />
                        <h1 className='font-bold text-3xl'>Cement Sales in {new Date().getFullYear()}</h1>
                        <h2>Generated on: {new Date().toDateString()}</h2>
                    </div>
                    <div className=''>
                        <div className='flex gap-2'>
                            <div className='flex flex-col'>
                                <span className='font-bold text-lg'>CIMERWA PLC</span>
                                <span className='text-gray-500'>Rusizi Office</span>
                                <span className='text-gray-500'>P.O Box 21, Rusizi-Rwanda</span>
                                <span className='text-gray-500'>sales@cimerwa.rw</span>
                                <span className='text-gray-500'>info@cimerwa.rw</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='mt-8'>
                    Cement production sales for {new Date().getFullYear()}. This report contains all sales for Premium 42,5, Surecem, Surebuild, Sureroad and Surewall.
                </p>

                {/* Report content */}
                <table className='mt-4 w-full'>
                    <thead className='bg-gray-400'>
                        <tr>
                            <th className='p-2' colSpan={14}>Cement Production</th>
                        </tr>
                        <tr className='bg-gray-200 text-sm'>
                            <th align='left' className=' p-1'>Cement Types/Month</th>
                            <th align='left'>Jan</th>
                            <th align='left'>Feb</th>
                            <th align='left'>Mar</th>
                            <th align='left'>Apr</th>
                            <th align='left'>May</th>
                            <th align='left'>Jun</th>
                            <th align='left'>Jul</th>
                            <th align='left'>Aug</th>
                            <th align='left'>Sep</th>
                            <th align='left'>Oct</th>
                            <th align='left'>Nov</th>
                            <th align='left'>Dec</th>
                            <th align='left'>Total</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        <tr className='border-b'>
                            <td className=' p-1'>Premium 42,5</td>
                            {premium && premium.map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='font-bold'>{premium && premium.reduce((a, b) => a + b, 0)}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className=' p-1'>Surecem</td>
                            {surecem && surecem.map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='font-bold'>{surecem && surecem.reduce((a, b) => a + b, 0)}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className=' p-1'>Surebuild</td>
                            {surebuild && surebuild.map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='font-bold'>{surebuild && surebuild.reduce((a, b) => a + b, 0)}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className=' p-1'>Surewall</td>
                            {surewall && surewall.map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='font-bold'>{surewall && surewall.reduce((a, b) => a + b, 0)}</td>
                        </tr>
                        <tr className='border-b'>
                            <td className=' p-1'>Sureroad</td>
                            {sureroad && sureroad.map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='font-bold'>{sureroad && sureroad.reduce((a, b) => a + b, 0)}</td>
                        </tr>
                        {/* <tr className='border-b'>
                            <td className='p-1 font-bold'>Total per Month</td>
                            
                        </tr> */}
                    </tbody>
                </table>
            </div>

            {/* Footer  */}
            <p className='mt-16 text-sm text-slate-800'>Copyright {new Date().getFullYear()} &copy; CIMERWA PLC. All Rights Reserved.</p>
        </div>
    )
})