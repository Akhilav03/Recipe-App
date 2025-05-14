import Chef from "../assets/chef.png"
import Cooking from "../assets/cooking.png"

export default function Header(){
    return(
        <header>
            <div className="header-content">
                <img className="chef" src={Chef} alt="Chef Icon" />
                <h1> Chef Claude</h1>
                <img className="cooking" src={Cooking} alt="Cooking Icon" />
            </div>
        </header>
    )
}