import { NavigationLink } from "../Components/NavigationLink/NavigationLink"
import { MoveLeft } from "lucide-react"
export function AdminView () {
    return(
        <>
                <section className="content">
                    <div className="nvgt-container">
                        <NavigationLink to="/">
                            <MoveLeft />
                            Tilbake
                        </NavigationLink>
                    </div>
                    </section>
        </>
    )
}