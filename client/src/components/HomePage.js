import React from 'react'
import MainGrid from './MainGrid'
import CollapsibleNav from './CollapsibleNav'
import Footer from './Footer'
import FirstSection from './FirstSection'
import { CheckoutButton } from './CheckoutButton'
import { Box, ResponsiveContext } from 'grommet'

export default function HomePage() {
    return (
        <>
            <CollapsibleNav showCart={false} showMenu={true} />
            <ResponsiveContext.Consumer>
                {responsive =>
                    responsive === "small" ? (
                        <span style={{ position: 'fixed', right: '1rem', top: '2rem' }}>
                            <CheckoutButton showLabel={false} /></span>) : (
                            <span style={{ position: 'fixed', right: '1rem', top: '1.2rem' }}>
                                <CheckoutButton showLabel={true} /></span>
                        )}
            </ResponsiveContext.Consumer>
            <FirstSection />
            <MainGrid />
            <Footer />
        </>

    )
}
