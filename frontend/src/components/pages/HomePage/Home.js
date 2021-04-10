import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import RealizacjeCards from './Cards__Realizacje/RealizacjeCards.js'
import PortfolioCards from './Cards__Portfolio/PortfolioCards.js'
import OFirmieCards from './Cards__OFirmie/OFirmieCards.js'
import SecondaryNav from './SecondaryNav.js'
import Overlay from '../../Overlay.js'
import BigCard from './BigCard.js'
import logo1 from '../../static/logo_stripped.svg'
import './Home.scss'

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
                            <img src={logo1} alt="Logo" />
                        </div>
                    </div>
                </div>
    )
}
export default function HomeNew() {
    const [ ref1, inView1 ] = useInView({threshold: 0.9})
    const [ ref2, inView2 ] = useInView({threshold: 0.9})
    const [ ref3, inView3 ] = useInView({threshold: 0.3})
    const [ overlayState, setOverlayState ] = useState()
    const [ viewState, setViewState ] = useState()
    const [ viewCard, setViewCard ] = useState()
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
                <Overlay 
                    overlayFunction={overlayFunction} 
                    />
            }
            <div className="Header__container">
                <Header />
            </div>
            <div className="Content__container lazy_load_image">
                <div className="SecondaryNav__offset"></div>
                <div className="test">
                    <SecondaryNav 
                        viewStateUtil={[ viewState, setViewState ]}
                        />
                </div>
                <div ref={ref1} className="Content__box">
                    <RealizacjeCards />
                </div>
                <div ref={ref2} className="Content__box darker">
                    <PortfolioCards 
                        setViewCard={ setViewCard } 
                        setOverlayState = {setOverlayState}
                        />
                </div>
                <div ref={ref3} className="Content__box">
                    <OFirmieCards />
                </div>
                <AnimatePresence>
                {
                    viewCard &&
                        <BigCard 
                            setOverlayState={setOverlayState} 
                            viewCard={ viewCard } 
                            />
                }
                </AnimatePresence>
            </div>
            <div style={{height: 100, backgroundColor: "#0E2F56"}} />
        </div>
    )
}