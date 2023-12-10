
const Card = (lastRecord: { startDate: string, endDate: string, afterDays: number }) => {


    return (
        <div className="card sm:w-11/12 md:w-2/4 lg:w-1/5 h-max rounded-2xl bg-primary text-primary-content flex justify-center items-center p-10">
            <div>
                {!lastRecord ? <span className="loading loading-spinner text-info"></span> :
                    <table className="table">
                        <thead className="sm:text-4xl md:text-xl lg:text-xl text-black">
                            <tr><th>Start</th><td>{lastRecord && lastRecord.startDate}</td></tr>
                            <tr><th>End</th><td>{lastRecord && lastRecord.endDate}</td></tr>
                            <tr><th>After</th><td>{lastRecord && lastRecord.afterDays} days</td></tr>
                        </thead>
                    </table>}
            </div>
        </div>
    )
}

export default Card