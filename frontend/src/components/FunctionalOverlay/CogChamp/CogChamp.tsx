import './CogChamp.scss'
import CogChampSvg from '../../static/cog2.svg'

interface cogChampInterface {
  menuState: boolean,
  toggleMenu: () => void
}

const CogChamp: React.FC<cogChampInterface> = ({menuState, toggleMenu}) => {
  return (
    <div className="CogChamp__component HiddenOnSmallScreen">
      <div className="container">
        <div
          className={menuState ? "CogChamp CogActive" : "CogChamp" }
          onClick={() => toggleMenu()} >
          <img alt="triggerMenu" src={ CogChampSvg } />
        </div>
      </div>
    </div>
  )
}
export default CogChamp
