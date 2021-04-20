import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import RealizacjeCards from './Cards__Realizacje/RealizacjeCards'
import PortfolioCards from './Cards__Portfolio/PortfolioCards'
import OFirmieCards from './Cards__OFirmie/OFirmieCards'
import SecondaryNav from './SecondaryNav'
import Overlay from '../../Overlay'
import BigCard from './BigCard'
import './Home.scss'

const Logo = lazy(() => import('../../static/logo_stripped.js'))


const Header = () => {
  return (
    <div className="Header lazy_load_image">
      <div className="Header-Stripes__container">
        <div className="Stripe__3">
          <div className="Stripe__SubText">
            Od ponad 20 lat stale udoskonalamy i 
            rozszerzamy naszą ogólnopolską ofertę.
          </div>
        </div>
        <div className="Stripe__2">
            <div className="Stripe__Text">
              Jesteśmy firmą inżynierską 
              oferującą szeroki zakres usług.
            </div>
        </div>
        <div className="Stripe__1">
          <Suspense fallback={<div />}>
            <Logo />
          </Suspense>
        </div>
      </div>
    </div>
  )
}


const HomeNew: React.FC = () => {
  const [ ref1, inView1 ] = useInView({threshold: 0.9})
  const [ ref2, inView2 ] = useInView({threshold: 0.9})
  const [ ref3, inView3 ] = useInView({threshold: 0.3})
  const [ overlayState, setOverlayState ] = useState<Boolean>(false)
  const [ viewState, setViewState ] = useState<number>(0)
  const [ viewCard, setViewCard ] = useState<number>(0)
  const overlayFunction = () => {
    setViewCard(0)
    setOverlayState(false)
  }
  useEffect(() => {
    inView1 && setViewState(1)
    inView2 && setViewState(2)
    inView3 && setViewState(3)
  }, [inView1, inView2, inView3])
  return (
    <div className="HomeNew_v2__component">
      {
      overlayState &&
          <Overlay overlayFunction={overlayFunction} />
      }
      <div className="Header__container">
          <Header />
      </div>
      <div className="Content__container lazy_load_image">
        <div className="SecondaryNav__offset"></div>
        <div className="test">
            <SecondaryNav viewStateUtil={[ viewState, setViewState ]} />
        </div>
        <div ref={ref1} className="Content__box">
          <RealizacjeCards />
        </div>
        <div ref={ref2} className="Content__box darker">
          <PortfolioCards setViewCard={ setViewCard } setOverlayState = {setOverlayState} />
        </div>
        <div ref={ref3} className="Content__box">
          <OFirmieCards />
        </div>
        <AnimatePresence>
        {
          viewCard &&
            <BigCard viewCard={ viewCard } />
        }
        </AnimatePresence>
      </div>
      <div style={{height: 100, backgroundColor: "#0E2F56"}} />
    </div>
  )
}

export default HomeNew