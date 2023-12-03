interface Data {
    startDay: number,
    startMonth: number,
    startYear: number,
    endDay: number,
    endMonth: number,
    endYear: number,
    afterDays: number
}

const monthNumberToNameMap: Record<number, string> = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
};

const OldRecords = ({ data }: { data: Data }) => {

    return (
        <div className="card w-max bg-primary h-min text-primary-content">
            <div className="card-body">
                <table className="table">
                    <thead className="text-xl text-black">
                        <tr>
                            <th>Start Date</th>
                            <td>
                                {data.startDay} {monthNumberToNameMap[data.startMonth]} {data.startYear}
                            </td>
                        </tr>
                        <tr>
                            <th>End Date</th>
                            <td>
                                {data.endDay} {monthNumberToNameMap[data.endMonth]} {data.endYear}
                            </td>
                        </tr>
                        <tr>
                            <th>Happened After</th>
                            <td>{data.afterDays} days</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default OldRecords