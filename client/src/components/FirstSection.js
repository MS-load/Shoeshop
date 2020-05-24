import React from 'react';
import { Box, Carousel, Heading, Image } from "grommet";
import CarouselImage1 from '../assets/sports.jpg'
import CarouselImage2 from '../assets/fancy.jpg'
import CarouselImage3 from '../assets/street.jpg'

export default function FirstSection() {
    return (
        <Box direction='row-responsive'
            round='medium'
            justify='center'
            align='center'
            height='medium'
            border='all'
            margin='medium'
            pad='small'
        >
            {/* <Box
                justify='center'
                alignSelf='center'
                style={{ maxWidth: '100%' }}
            > */}
                <Carousel fill play={5000}>
                    <Image fit="cover" fill="true" style={{ width: '100%', height: '100%' }} src={CarouselImage1} />
                    <Image fit="cover" fill="true" style={{ width: '100%', height: '100%' }} src={CarouselImage2} /> 
                    <Image fit="cover" fill="true" style={{ width: '100%', height: '100%' }} src={CarouselImage3} /> 
                </Carousel>

            {/* </Box> */}

           
        </Box>

    );
}

