const MobileNavigation = ({toggleMenu}) => {
  return (
    <div 
      className="Nav__group Font__Card HiddenOnBigScreen Hbgr_container"
      onClick={() => toggleMenu()}
    >
      <div className="Hbgr">
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="https://www.w3.org/2000/svg">
          <rect width="25" height="5" fill="white"/>
          <rect y="10" width="25" height="5" fill="white"/>
          <rect y="20" width="25" height="5" fill="white"/>
        </svg>
      </div>
    </div>
  )
}

export default MobileNavigation