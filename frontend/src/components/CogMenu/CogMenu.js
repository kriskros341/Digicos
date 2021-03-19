import './CogMenu.scss'
import { CSSTransition } from 'react-transition-group'
import CogChamp from '../static/cog2.svg'

const CogMenu = ({cogStateUtil}) => {
    const [cogState, switchCog] = cogStateUtil
    return(
    <div className={cogState ? "CogMenu__container Cog__active" : "CogMenu__container" }>
            <CSSTransition
                in={ cogState }
                timeout={ 1000 }
                className="CogMenu"
            >
                <div className="CogMenu"></div> 
            </CSSTransition> 
        <div onClick={ switchCog } className="CogChamp">
            <img src={ CogChamp }></img>
        </div>
    </div>
    )
}
export default CogMenu
