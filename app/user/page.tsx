import Calender from "./Calender"
import Card from "./Card"

const UserPage = () => {
    return (
        <div className="h-4/5 flex flex-col justify-center items-center gap-10">
            <p className="text-3xl">Last Cycle</p>
            <Card />
            <Calender />
        </div>
    )
}

export default UserPage