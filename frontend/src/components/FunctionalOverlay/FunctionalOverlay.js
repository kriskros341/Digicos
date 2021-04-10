const CogMenu = lazy(() => import('./components/FunctionalOverlay/CogMenu/CogMenu.js'))

const FunctionalOverlay = (props) => {
    const [cogState, setCogState] = useState(false)
    return (
        <div>
            <Navbar Link={Link} />
            <BottomMenu />
            <CogMenu location={""} />
        </div>
    )
}
export default FunctionalOverlay